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
    public class BandShindigRepository
    {
        readonly string _connectionString;

        public BandShindigRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<BandShindig> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var bandshindigs = db.Query<BandShindig>(@"
                    Select *
                    From [BandShindig]").ToList();

                return bandshindigs;
            }
        }

        public BandShindig GetSingle(int id)
        {
            using (var db = new SqlConnection(_connectionString))
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
            using (var db = new SqlConnection(_connectionString))
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
            using (var db = new SqlConnection(_connectionString))
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
