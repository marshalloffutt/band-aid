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
    public class BandShindigsController : ControllerBase
    {
        readonly BandShindigRepository _bandShindigRepository;

        public BandShindigsController(BandShindigRepository bandShindigRepository)
        {
            _bandShindigRepository = bandShindigRepository;
        }

        [HttpGet]
        public ActionResult GetAllBandShindigs()
        {
            var bandshindigs = _bandShindigRepository.GetAll();

            return Ok(bandshindigs);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleBandShindig(int id)
        {
            var bandShindig = _bandShindigRepository.GetSingle(id);

            return Ok(bandShindig);
        }

        [HttpPost("register")]
        public ActionResult AddBandShindig(CreateBandShindigRequest createRequest)
        {
            var newBandShindig = _bandShindigRepository.AddBandShindig(
                createRequest.BandId,
                createRequest.ShindigId);

            return Created($"api/bandshindig/{newBandShindig.Id}", newBandShindig);
        }

        [HttpDelete("delete/{bandShindigId}")]
        public ActionResult delete(int bandShindigId)
        {
            var bandShindigToDelete = _bandShindigRepository.DeleteBandShindig(bandShindigId);

            return Ok(bandShindigToDelete);
        }
    }
}