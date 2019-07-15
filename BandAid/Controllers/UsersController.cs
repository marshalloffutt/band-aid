using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BandAid.Data;
using BandAid.Models;
using BandAid.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BandAid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly UserRepository _userRepository;
        readonly CreateUserRequestValidator _validator;

        public UsersController()
        {
            _userRepository = new UserRepository();
            _validator = new CreateUserRequestValidator();
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var Users = _userRepository.GetAll();

            return Ok(Users);
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
                createRequest.Instrument,
                createRequest.YearsOfExp,
                createRequest.ImageUrl);

            return Created($"api/user/{newUser.Id}", newUser);
        }

        [HttpPut("update/{id}")]
        public ActionResult update(User user)
        {
            var updatedUser = _userRepository.Update(user);

            return Ok(user);
        }
    }
}