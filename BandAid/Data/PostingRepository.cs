using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Models;
using System.Data.SqlClient;

namespace BandAid.Data
{
    public class PostingRepository
    {
        const string ConnectionString = "Server=localhost;Database=BandAid;Trusted_Connection=True;";

        public IEnumerable<Posting> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var postings = db.Query<Posting>(@"
                    Select *
                    From [Posting]
                    Where closed = 0").ToList();

                return postings;
            }
        }

        public Posting GetSingle(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var posting = db.QueryFirstOrDefault<Posting>(@"
                    Select * from [Posting]
                    Where id = @id",
                    new { id });

                return posting;
            }
        }

        public Posting AddPosting(string instrumentRequested, string description, bool closed)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[Posting](
                        [InstrumentRequested],
                        [Description],
                        [Closed])
                    Output inserted.*
                    Values(@instrumentrequested, @description, @closed)";

                var parameters = new
                {
                    InstrumentRequested = instrumentRequested,
                    Description = description,
                    Closed = closed
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
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                        Update [dbo].[Posting]
                            Set instrumentRequested = @instrumentrequested,
                            description = @description,
                            closed = @closed
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
            using (var db = new SqlConnection(ConnectionString))
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
