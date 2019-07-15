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
                var users = db.Query<User>(@"
                Select *
                From [User]
                Where inactive = 0").ToList();

                return users;
            }
        }

        public User GetSingle(int id)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var user = db.QueryFirstOrDefault<User>(@"
                    Select * from [User]
                    Where id = @id",
                    new { id });

                return user;
            }
        }

        public User AddUser(string firstName, string lastName, string email, DateTime dateCreated, long phone,
            string address, string city, string state, string instrument, int yearsOfExp, string imageUrl, bool inactive)
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
                        [ImageUrl],
                        [Inactive])
                    Output inserted.*
                    Values(@firstname, @lastname, @email, @datecreated, @phone, @address,  
                    @city, @state, @instrument, @yearsofexp, @imageurl, @inactive)";

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
                    ImageUrl = imageUrl,
                    Inactive = inactive,
                };

                var newUser = db.QueryFirstOrDefault<User>(insertQuery, parameters);

                if (newUser != null)
                {
                    return newUser;
                }
            }

            throw new Exception("Could not create user");
        }

        public User Update(User userToUpdate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                        Update [dbo].[User]
                        Set firstName = @firstname,
                            lastName = @lastname,
                            email = @email,
                            dateCreated = @datecreated,
                            phone = @phone,
                            address = @address,
                            city = @city,
                            state = @state,
                            instrument = @instrument,
                            yearsOfExp = @yearsofexp,
                            imageUrl = @imageurl,
                            inactive = @inactive
                        Where id = @id";

                var rowsAffected = db.Execute(updateQuery, userToUpdate);

                if (rowsAffected == 1)
                {
                    return userToUpdate;
                }

                else throw new Exception("Could not update user");
            }

        }

        public bool Deactivate(User userToDeactivate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var updateQuery = @"
                    Update [User]
                    Set inactive = 1
                    Where id = @id";

                var rowsAffected = db.Execute(updateQuery, userToDeactivate);

                if (rowsAffected == 1)
                {
                    return true;
                } else throw new Exception("Could not deactivate account");
            }
        }
    }
}
