using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Models;
using System.Data.SqlClient;

namespace BandAid.Data
{
    public class UserRepository
    {
        const string ConnectionString = "Server=localhost;Database=BandAid;Trusted_Connection=True;";

        public IEnumerable<User> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var users = db.Query<User>("Select * from [User]").ToList();

                return users;
            }
        }

        public User AddUser(string firstName, string lastName, string email, DateTime dateCreated, int phone,
            string address, string city, string state, string instrument, int yearsOfExp, string imageUrl)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var insertQuery = @"
                    Insert into [dbo].[User](
                        [FirstName],
                        [LastName],
                        [Email],
                        [DateCreated],
                        [Phone],
                        [Address],
                        [City],
                        [State],
                        [Instrument],
                        [YearsOfExp],
                        [ImageUrl])
                    Output inserted.*
                    Values(@firstname, @lastname, @email, @datecreated, @phone,  
                    @address, @city, @state, @instrument, @yearsofexp, @imageurl)";

                var parameters = new
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    DateCreated = dateCreated,
                    Phone = phone,
                    Address = address,
                    City = city,
                    State = state,
                    Instrument = instrument,
                    YearsOfExp = yearsOfExp,
                    ImageUrl = imageUrl
                };

                var newUser = db.QueryFirstOrDefault<User>(insertQuery, parameters);

                if (newUser != null)
                {
                    return newUser;
                }
            }

            throw new Exception("Could not create user");
        }
    }
}
