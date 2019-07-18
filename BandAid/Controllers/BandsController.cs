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
    public class BandsController : ControllerBase
    {
        readonly BandRepository _bandRepository;

        public BandsController(BandRepository bandRepository)
        {
            _bandRepository = bandRepository;
        }

        [HttpGet]
        public ActionResult GetAllBands()
        {
            var bands = _bandRepository.GetAll();

            return Ok(bands);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleBand(int id)
        {
            var band = _bandRepository.GetSingle(id);

            return Ok(band);
        }

        [HttpPost("register")]
        public ActionResult AddBand(CreateBandRequest createRequest)
        {
            var newBand = _bandRepository.AddBand(
                createRequest.Name,
                createRequest.Genre,
                createRequest.Description,
                createRequest.LogoUrl,
                createRequest.DateCreated,
                createRequest.Inactive,
                createRequest.City,
                createRequest.State);

            return Created($"api/band/{newBand.Id}", newBand);
        }

        [HttpPut("update/{id}")]
        public ActionResult update(Band band)
        {
            var updatedBand = _bandRepository.Update(band);

            return Ok(updatedBand);
        }

        [HttpPut("deactivate/{id}")]
        public ActionResult deactivate(Band band)
        {
            var deactivatedBand = _bandRepository.Deactivate(band);

            return Ok(deactivatedBand);
        }
    }
}