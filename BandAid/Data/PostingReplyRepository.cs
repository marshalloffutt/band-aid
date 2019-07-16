using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Models;
using System.Data.SqlClient;

namespace BandAid.Data
{
    public class PostingReplyRepository
    {
        const string ConnectionString = "Server=localhost;Database=BandAid;Trusted_Connection=True;";

        public IEnumerable<PostingReply> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
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
            using (var db = new SqlConnection(ConnectionString))
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
    }
}
