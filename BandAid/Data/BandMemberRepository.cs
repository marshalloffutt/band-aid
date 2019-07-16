using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Models;
using System.Data.SqlClient;

namespace BandAid.Data
{
    public class BandMemberRepository
    {
        const string ConnectionString = "Server=localhost;Database=BandAid;Trusted_Connection=True;";

        public IEnumerable<BandMember> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var bandmembers = db.Query<BandMember>(@"
                    Select *
                    From [BandMember]").ToList();

                return bandmembers;
            }
        }

        public BandMember GetSingle(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var bandmember = db.QueryFirstOrDefault<BandMember>(@"
                    Select *
                    From [BandMember]
                    Where id = @id",
                    new { id });

                return bandmember;
            }
        }

        public BandMember AddBandMember(int musicianId, int bandId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[BandMember](
                        [MusicianId],
                        [BandId])
                    Output inserted.*
                    Values(@musicianid, @bandid)";

                var parameters = new
                {
                    MusicianId = musicianId,
                    BandId = bandId
                };

                var newBandMember = db.QueryFirstOrDefault<BandMember>(insertQuery, parameters);

                if (newBandMember != null)
                {
                    return newBandMember;
                }
            }

            throw new Exception("Could not create new band member");
        }

        public BandMember DeleteBandMember(int bandMemberId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var deletedBandMember = db.QueryFirstOrDefault<BandMember>(@"
                    Delete from [BandMember]
                    Output deleted.*
                    Where Id = @bandMemberId",
                    new { bandMemberId });

                if (deletedBandMember != null)
                {
                    return deletedBandMember;
                }
            }

            throw new Exception("Could not delete band member");
        }
    }
}
