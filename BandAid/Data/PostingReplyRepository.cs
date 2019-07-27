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
    public class PostingReplyRepository
    {
        readonly string _connectionString;

        public PostingReplyRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<PostingReply> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var postingReplies = db.Query<PostingReply>(@"
                    Select *
                    From [PostingReply]
                    Where Closed = 0").ToList();

                return postingReplies;
            }
        }

        public PostingReply GetSingle(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var postingreply = db.QueryFirstOrDefault<PostingReply>(@"
                    Select *
                    From [PostingReply]
                    Where id = @id",
                    new { id });

                return postingreply;
            }
        }

        public PostingReply AddPostingReply(DateTime dateCreated, int postingId, int musicianId, string message, bool closed)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[PostingReply](
                        [DateCreated],
                        [PostingId],
                        [MusicianId],
                        [Message],
                        [Closed])
                    Output inserted.*
                    Values(@datecreated, @postingid, @musicianid, @message, @closed)";

                var parameters = new
                {
                    DateCreated = dateCreated,
                    PostingId = postingId,
                    MusicianId = musicianId,
                    Message = message,
                    Closed = closed
                };

                var newPostingReply = db.QueryFirstOrDefault<PostingReply>(insertQuery, parameters);

                if (newPostingReply != null)
                {
                    return newPostingReply;
                }
            }

            throw new Exception("Could not create new posting reply");
        }

        public PostingReply Update(PostingReply postingReplyToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                        Update [dbo].[PostingReply]
                        Set dateCreated = @datecreated,
                            postingId = @postingid,
                            musicianId = @musicianid,
                            message = @message,
                            closed = @closed
                        Where id = @id";

                var rowsAffected = db.Execute(updateQuery, postingReplyToUpdate);

                if (rowsAffected == 1)
                {
                    return postingReplyToUpdate;
                }

                else throw new Exception("Could not update posting reply");
            }
        }

        public bool CloseReply(PostingReply postingReplyToClose)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                    Update [PostingReply]
                    Set closed = 1
                    Where id = @id";

                var rowsAffected = db.Execute(updateQuery, postingReplyToClose);

                if (rowsAffected == 1)
                {
                    return true;
                }
                else throw new Exception("Could not close posting reply");
            }
        }

        public IEnumerable<Object> GetRepliesForPosting(int postingId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var postingReplies =db.Query<Object>(@"
                    Select pr.id, u.firstname, u.lastname, u.Instrument, u.YearsOfExp, pr.message,
                            pr.DateCreated, b.id as BandId, b.name, p.id as PostingId, u.id as UserId
                    From posting p
                    Join band b on b.id = p.bandid
                    Join postingreply pr on pr.PostingId = p.id
                    Join [user] u on u.id = pr.musicianId
                    Where pr.closed = 0
                    And p.id = @postingId",
                    new { postingId });

                return postingReplies.ToList();
            }

            throw new Exception("Could not get posting replies for posting");
        }
    }
}
