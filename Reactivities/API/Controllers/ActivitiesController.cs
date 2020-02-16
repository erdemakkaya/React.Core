using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace DatingApp.API.Controllers
{
    [Route ("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase {
        private readonly IMediator _mediator;
        public ActivitiesController (IMediator mediator) {
        _mediator = mediator;
        }
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> Get () {
            var values = await _mediator.Send (new List.Query());
            return Ok (values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Get(Guid id)
        {
            var value = await _mediator.Send(new Details.Query{Id=id });
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Unit>> Post (Create.Command command) {
            return await _mediator.Send(command);
        }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public async Task<ActionResult<Unit>> Put (Guid id,Edit.Command command) {
            command.Id = id;
            return await _mediator.Send(command);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}