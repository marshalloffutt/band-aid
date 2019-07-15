using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Models;
using System.Data.SqlClient;

namespace BandAid.Data
{
    public class BandRepository
    {
        const string ConnectionString = "Server=localhost;Database=BandAid;Trusted_Connection=True;";

        public IEnumerable<Band> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var bands = db.Query<Band>(@"
                    Select *
                    From [Band]
                    Where inactive = 0").ToList();

                return bands;
            }
        }

        public Band GetSingle(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var band = db.QueryFirstOrDefault<Band>(@"
                    Select * from [Band]
                    Where id = @id",
                    new { id });

                return band;
            }
        }

        public Band AddBand(string name, string genre, string description, string logoUrl, 
            DateTime dateCreated, bool inactive, string city, string state)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[Band](
                        [Name],
                        [Genre],
                        [Description],
                        [LogoUrl],
                        [DateCreated],
                        [Inactive],
                        [City],
                        [State])
                    Output inserted.*
                    Values(@name, @genre, @description, @logourl, 
                    @datecreated, @inactive, @city, @state)";

                var parameters = new
                {
                    Name = name,
                    Genre = genre,
                    Description = description,
                    LogoUrl = logoUrl,
                    DateCreated = dateCreated,
                    Inactive = inactive,
                    City = city,
                    State = state
                };

                var newBand = db.QueryFirstOrDefault<Band>(insertQuery, parameters);

                if (newBand != null)
                {
                    return newBand;
                }
            }
            throw new Exception("Could note create band");
        }

        public Band Update(Band bandToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                        Update [dbo].[Band]
                        Set name = @name,
                            genre = @genre,
                            description = @description,
                            logoUrl = @logourl,
                            dateCreated = @datecreated,
                            inactive = @inactive,
                            city = @city,
                            state = @state
                        Where id = @id";

                var rowsAffected = db.Execute(updateQuery, bandToUpdate);

                if (rowsAffected == 1)
                {
                    return bandToUpdate;
                }

                else throw new Exception("Could not update band");
            }
        }

        public bool Deactivate(Band bandToDeactivate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                    Update [Band]
                    Set inactive = 1
                    Where id = @id";

                var rowsAffected = db.Execute(updateQuery, bandToDeactivate);

                if (rowsAffected == 1)
                {
                    return true;
                }
                else throw new Exception("Could not deactivate band");
            }
        }
    }
}
