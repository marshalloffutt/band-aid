using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Models;
using System.Data.SqlClient;

namespace BandAid.Data
{
    public class BandShindigRepository
    {
        const string ConnectionString = "Server=localhost;Database=BandAid;Trusted_Connection=True;";

        public IEnumerable<BandShindig> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var bandshindigs = db.Query<BandShindig>(@"
                    Select *
                    From [BandShindig]").ToList();

                return bandshindigs;
            }
        }

        public BandShindig GetSingle(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var bandshindig = db.QueryFirstOrDefault<BandShindig>(@"
                    Select *
                    From [BandShindig]
                    Where id = @id",
                    new { id });

                return bandshindig;
            }
        }

        public BandShindig AddBandShindig(int bandId, int shindigId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[BandShindig](
                        [BandId],
                        [ShindigId])
                    Output inserted.*
                    Values(@bandid, @shindigid)";

                var parameters = new
                {
                    BandId = bandId,
                    ShindigId = shindigId
                };

                var newBandShindig = db.QueryFirstOrDefault<BandShindig>(insertQuery, parameters);

                if (newBandShindig != null)
                {
                    return newBandShindig;
                }
            }

            throw new Exception("Could not create new band shindig");
        }

        public BandShindig DeleteBandShindig(int bandShindigId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var deletedBandShindig = db.QueryFirstOrDefault<BandShindig>(@"
                    Delete from [BandShindig]
                    Output deleted.*
                    Where Id = @bandShindigId",
                    new { bandShindigId });

                if (deletedBandShindig != null)
                {
                    return deletedBandShindig;
                }
            }

            throw new Exception("Could not delete band shindig");
        }
    }
}
