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
    public class PostingRepliesController : ControllerBase
    {
        readonly PostingReplyRepository _postingReplyRepository;

        public PostingRepliesController()
        {
            _postingReplyRepository = new PostingReplyRepository();
        }

        [HttpGet]
        public ActionResult GetAllPostingReplies()
        {
            var postingreplies = _postingReplyRepository.GetAll();

            return Ok(postingreplies);
        }

        [HttpGet("{id}")]
        public ActionResult GetSinglePostingReply(int id)
        {
            var postingReply = _postingReplyRepository.GetSingle(id);

            return Ok(postingReply);
        }

        [HttpPost("register")]
        public ActionResult AddPostingReply(CreatePostingReplyRequest createRequest)
        {
            var newPostingReply = _postingReplyRepository.AddPostingReply(
                createRequest.DateCreated,
                createRequest.PostingId,
                createRequest.MusicianId,
                createRequest.Message,
                createRequest.Closed);

            return Created($"api/postingreply/{newPostingReply.Id}", newPostingReply);
        }

        [HttpPut("update/{id}")]
        public ActionResult update(PostingReply postingReply)
        {
            var updatedPostingReply = _postingReplyRepository.Update(postingReply);

            return Ok(updatedPostingReply);
        }

        [HttpPut("close/{id}")]
        public ActionResult close(PostingReply postingReply)
        {
            var closedPostingReply = _postingReplyRepository.CloseReply(postingReply);

            return Ok(closedPostingReply);
        }

    }
}