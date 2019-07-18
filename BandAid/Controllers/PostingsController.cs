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
    public class PostingsController : ControllerBase
    {
        readonly PostingRepository _postingRepository;

        public PostingsController(PostingRepository postingRepository)
        {
            _postingRepository = postingRepository;
        }

        [HttpGet]
        public ActionResult GetAllPostings()
        {
            var postings = _postingRepository.GetAll();

            return Ok(postings);
        }

        [HttpGet("{id}")]
        public ActionResult GetSinglePosting(int id)
        {
            var posting = _postingRepository.GetSingle(id);

            return Ok(posting);
        }

        [HttpPost("register")]
        public ActionResult AddPosting(CreatePostingRequest createRequest)
        {
            var newPosting = _postingRepository.AddPosting(
                createRequest.InstrumentRequested,
                createRequest.Description,
                createRequest.Closed,
                createRequest.BandId);

            return Created($"api/posting/{newPosting.Id}", newPosting);
        }

        [HttpPut("update/{id}")]
        public ActionResult update(Posting posting)
        {
            var updatedPosting = _postingRepository.Update(posting);

            return Ok(updatedPosting);
        }

        [HttpDelete("delete/{postingId}")]
        public ActionResult delete(int postingId)
        {
            var postingToDelete = _postingRepository.DeletePosting(postingId);

            return Ok(postingToDelete);
        }
    }
}