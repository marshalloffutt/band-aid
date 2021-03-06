﻿using System;
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

        public IEnumerable<Shindig> GetAll(int bandId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var events = db.Query<Shindig>(@"
                    Select *
                    From [Shindig]
                    Where hascometopass = 0
                    And bandId = @bandid",
                    new { bandId } );

                return events.ToList();
            }
        }

        public IEnumerable<Object> GetUserShindigs(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var events = db.Query<Object>(@"
                    Select s.id, s.description, s.eventdate, s.address, s.city, 
                            s.state, s.zipcode, b.name as band from [shindig] s
                    Join [band] b on b.Id = s.BandId
                    Join [bandmember] bm on bm.BandId = b.Id
                    Join [user] u on u.Id = bm.MusicianId
                    Where u.id = @userId",
                    new { userId });

                return events.ToList();
            }

            throw new Exception("Could not get shindigs.");
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

        public Shindig AddShindig(string description, DateTime eventDate_bad, string address, 
            string city, string state, int zipcode, bool hasComeToPass, int bandId)
        {
            DateTime eventDate = eventDate_bad.ToLocalTime();

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
                        [HasComeToPass],
                        [BandId])
                    Output inserted.*
                    Values(@description, @eventdate, @address, @city,
                    @state, @zipcode, @hascometopass, @bandid)";

                var parameters = new
                {
                    Description = description,
                    EventDate = eventDate,
                    Address = address,
                    City = city,
                    State = state,
                    Zipcode = zipcode,
                    HasComeToPass = hasComeToPass,
                    BandId = bandId
                };

                var newShindig = db.QueryFirstOrDefault<Shindig>(insertQuery, parameters);

                if (newShindig != null)
                {
                    return newShindig;
                }
            }
            throw new Exception("Could not create shindig");
        }

        public bool Update(int id, string description, DateTime eventDate_bad, string address,
            string city, string state, int zipcode, bool hasComeToPass, int bandId)
        {
            DateTime eventDate = eventDate_bad.ToLocalTime();

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
                            hasComeToPass = @hascometopass,
                            bandId = @bandid
                        Where id = @id";

                var parameters = new
                {
                    Id = id,
                    Description = description,
                    EventDate = eventDate,
                    Address = address,
                    City = city,
                    State = state,
                    Zipcode = zipcode,
                    HasComeToPass = hasComeToPass,
                    BandId = bandId
                };

                var rowsAffected = db.Execute(updateQuery, parameters);

                if (rowsAffected == 1)
                {
                    return true;
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
