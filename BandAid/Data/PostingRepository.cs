using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Models;
using System.Data.SqlClient;
using Microsoft.Extensions.Options;

namespace BandAid.Data
{
    public class PostingRepository
    {
        readonly string _connectionString;

        public PostingRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<Object> GetJustPostings()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var postings = db.Query<Object>(@"
                    Select p.Id, p.InstrumentRequested, p.Description,
                        p.Closed, b.Name as Band
                    From Posting p
                    Join band b on b.id = p.bandid
                    Where p.Closed = 0");

                return postings.ToList();
            }
        }

        public IEnumerable<Posting> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var postings = db.Query<Posting>(@"
                    Select *
                    From [Posting]
                    Where closed = 0");

                var replies = db.Query<PostingReply>("Select * From [PostingReply]");

                foreach (var posting in postings)
                {
                    posting.Replies = replies.Where(reply => reply.PostingId == posting.Id).ToList();
                }

                return postings.ToList();
            }
        }

        public Posting GetSingle(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var posting = db.QueryFirstOrDefault<Posting>(@"
                    Select * from [Posting]
                    Where id = @id",
                    new { id });

                var replies = db.Query<PostingReply>("Select * From [PostingReply]");

                posting.Replies = replies.Where(reply => reply.PostingId == posting.Id).ToList();

                return posting;
            }
        }

        public Posting AddPosting(string instrumentRequested, string description, bool closed, int bandId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[Posting](
                        [InstrumentRequested],
                        [Description],
                        [Closed],
                        [BandId])
                    Output inserted.*
                    Values(@instrumentrequested, @description, @closed, @bandid)";

                var parameters = new
                {
                    InstrumentRequested = instrumentRequested,
                    Description = description,
                    Closed = closed,
                    BandId = bandId
                };

                var newPosting = db.QueryFirstOrDefault<Posting>(insertQuery, parameters);

                if (newPosting != null)
                {
                    return newPosting;
                }
            }
            throw new Exception("Could not create posting");
        }

        public Posting Update(Posting postingToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                        Update [dbo].[Posting]
                            Set instrumentRequested = @instrumentrequested,
                            description = @description,
                            closed = @closed,
                            bandId = @bandid
                        Where id = @id";

                var rowsAffected = db.Execute(updateQuery, postingToUpdate);

                if (rowsAffected == 1)
                {
                    return postingToUpdate;
                }

                else throw new Exception("Could not update posting");
            }
        }

        public Posting DeletePosting(int postingId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedPosting = db.QueryFirstOrDefault<Posting>(@"
                    Delete from [Posting]
                    Output deleted.*
                    Where Id = @postingId",
                    new { postingId });

                if (deletedPosting != null)
                {
                    return deletedPosting;
                }
            }

            throw new Exception("Could not delete posting");
        }
    }
}
