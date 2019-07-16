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
    public class BandMembersController : ControllerBase
    {
        readonly BandMemberRepository _bandMemberRepository;

        public BandMembersController()
        {
            _bandMemberRepository = new BandMemberRepository();
        }

        [HttpGet]
        public ActionResult GetAllBandMembers()
        {
            var bandmembers = _bandMemberRepository.GetAll();

            return Ok(bandmembers);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleBandMember(int id)
        {
            var bandMember = _bandMemberRepository.GetSingle(id);

            return Ok(bandMember);
        }

        [HttpPost("register")]
        public ActionResult AddBandMember(CreateBandMemberRequest createRequest)
        {
            var newBandMember = _bandMemberRepository.AddBandMember(
                createRequest.MusicianId,
                createRequest.BandId);

            return Created($"api/bandmember/{newBandMember.Id}", newBandMember);
        }

        [HttpDelete("delete/{bandMemberId}")]
        public ActionResult delete(int bandMemberId)
        {
            var bandMemberToDelete = _bandMemberRepository.DeleteBandMember(bandMemberId);

            return Ok(bandMemberToDelete);
        }
    }
}