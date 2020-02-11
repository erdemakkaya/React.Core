using MediatR;
namespace Application.Activities
{
    public class List
    {
        public class Query:IRequest<List<Activity>>{}
    }
}