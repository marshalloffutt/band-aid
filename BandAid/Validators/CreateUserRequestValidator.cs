using System;
using BandAid.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BandAid.Validators
{
    public class CreateUserRequestValidator
    {
        public bool Validate(CreateUserRequest requestToValidate)
        {
            return string.IsNullOrEmpty(requestToValidate.Email);
        }
    }
}
