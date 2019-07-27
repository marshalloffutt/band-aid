using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Data;
using BandAid.Models;
using BandAid.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace BandAid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly UserRepository _userRepository;
        readonly CreateUserRequestValidator _validator;

        public UsersController(UserRepository userRepository)
        {
            _userRepository = userRepository;
            _validator = new CreateUserRequestValidator();
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var users = _userRepository.GetAll();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleUser(int id)
        {
            var user = _userRepository.GetSingle(id);

            return Ok(user);
        }

        [HttpPost("register")]
        public ActionResult AddUser(CreateUserRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "users must provide a valid email." });
            }

            var newUser = _userRepository.AddUser(
                createRequest.FirstName,
                createRequest.LastName,
                createRequest.Email,
                createRequest.DateCreated,
                createRequest.Phone,
                createRequest.Address,
                createRequest.City,
                createRequest.State,
                createRequest.Zipcode,
                createRequest.Instrument,
                createRequest.YearsOfExp,
                createRequest.ImageUrl,
                createRequest.Bio,
                createRequest.Inactive);

            return Created($"api/user/{newUser.Id}", newUser);
        }

        [HttpPut("update/{id}")]
        public ActionResult update(User user)
        {
            var updatedUser = _userRepository.Update(user);

            return Ok(updatedUser);
        }

        [HttpPut("deactivate/{id}")]
        public ActionResult deactivate(User user)
        {
            var deactivatedUser = _userRepository.Deactivate(user);

            return Ok(deactivatedUser);
        }
    }
}