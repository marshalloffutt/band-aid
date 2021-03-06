﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BandAid.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class SecureControllerBase : ControllerBase
    {
        protected string UsrId => User.FindFirst(x => x.Type == "user_id").Value;
    }
}