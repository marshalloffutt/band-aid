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
    public class ShindigRepository
    {
        readonly string _connectionString;

        public ShindigRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<Shindig> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var events = db.Query<Shindig>(@"
                    Select *
                    From [Shindig]
                    Where hascometopass = 0").ToList();

                return events;
            }
        }

        public Shindig GetSingle(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var shindig = db.QueryFirstOrDefault<Shindig>(@"
                    Select * from [Shindig]
                    Where id = @id",
                    new { id });

                return shindig;
            }
        }

        public Shindig AddShindig(string description, DateTime eventDate, string address, 
            string city, string state, int zipcode, bool hasComeToPass)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[Shindig](
                        [Description],
                        [EventDate],
                        [Address],
                        [City],
                        [State],
                        [Zipcode],
                        [HasComeToPass])
                    Output inserted.*
                    Values(@description, @eventdate, @address, @city,
                    @state, @zipcode, @hascometopass)";

                var parameters = new
                {
                    Description = description,
                    EventDate = eventDate,
                    Address = address,
                    City = city,
                    State = state,
                    Zipcode = zipcode,
                    HasComeToPass = hasComeToPass
                };

                var newShindig = db.QueryFirstOrDefault<Shindig>(insertQuery, parameters);

                if (newShindig != null)
                {
                    return newShindig;
                }
            }
            throw new Exception("Could not create shindig");
        }

        public Shindig Update(Shindig shindigToUpdate)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updateQuery = @"
                        Update [dbo].[Shindig]
                            Set description = @description,
                            eventDate = @eventdate,
                            address = @address,
                            city = @city,
                            state = @state,
                            zipcode = @zipcode,
                            hasComeToPass = @hascometopass
                        Where id = @id";

                var rowsAffected = db.Execute(updateQuery, shindigToUpdate);

                if (rowsAffected == 1)
                {
                    return shindigToUpdate;
                }

                else throw new Exception("Could not update shindig");
            }
        }

        public Shindig DeleteShindig(int shindigId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedShindig = db.QueryFirstOrDefault<Shindig>(@"
                    Delete from [Shindig]
                    Output deleted.*
                    Where Id = @shindigId",
                    new { shindigId });

                if (deletedShindig != null)
                {
                    return deletedShindig;
                }
            }

            throw new Exception("Could not delete shindig");
        }
    }
}
