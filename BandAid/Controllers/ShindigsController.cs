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
    public class ShindigsController : ControllerBase
    {
        readonly ShindigRepository _shindigRepository;

        public ShindigsController(ShindigRepository shindigRepository)
        {
            _shindigRepository = shindigRepository;
        }

        [HttpGet]
        public ActionResult GetAllShindigs()
        {
            var shindigs = _shindigRepository.GetAll();

            return Ok(shindigs);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleShindig(int id)
        {
            var shindig = _shindigRepository.GetSingle(id);

            return Ok(shindig);
        }

        [HttpPost("register")]
        public ActionResult AddShindig(CreateShindigRequest createRequest)
        {
            var newShindig = _shindigRepository.AddShindig(
                createRequest.Description,
                createRequest.EventDate,
                createRequest.Address,
                createRequest.City,
                createRequest.State,
                createRequest.Zipcode,
                createRequest.HasComeToPass);

            return Created($"api/shindig/{newShindig.Id}", newShindig);
        }

        [HttpPut("update/{id}")]
        public ActionResult update(Shindig shindig)
        {
            var updatedShindig = _shindigRepository.Update(shindig);

            return Ok(updatedShindig);
        }

        [HttpDelete("delete/{shindigId}")]
        public ActionResult delete(int shindigId)
        {
            var shindigToDelete = _shindigRepository.DeleteShindig(shindigId);

            return Ok(shindigToDelete);
        }
    }
}