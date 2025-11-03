import { QueryClient } from "@tanstack/angular-query-experimental";
import { getIssueCommentsByNumber } from "./get-issue-comment-by-number.action";
import { environment } from "src/environments/environment.development";

// const BASE_URL = environment.baseUrl
// const GITHUB_TOKEN = environment.gitHubToken

const {BASE_URL, GITHUB_TOKEN} = process.env


describe('getIssuesComments (TanStack Query style)', () => {

const issueNumber = '123'
const mockComments: any[] = [
  {id: 1, body: 'first comment', user: {login:'user1'}},
  {id: 2, body: 'second comment', user: {login:'user2'}}
]

let queryClient: QueryClient;

beforeEach(() => {
  queryClient = new QueryClient()
})


it('should fetch comments successfully using QueryClient', async () => {
  spyOn(window, 'fetch').and.resolveTo(
    new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK'
    })
  )

  const result = await queryClient.fetchQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueCommentsByNumber(issueNumber)
  })

  expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

  expect(result).toEqual(mockComments)

});

it('should not fetch comments successfully using QueryClient', async () => {
  spyOn(window, 'fetch').and.resolveTo(
    new Response(JSON.stringify({}), {
      status: 404,
      statusText: 'Not Found'
    })
  )

  try {
    await queryClient.fetchQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueCommentsByNumber(issueNumber)
  })
  expect(true).toBeFalse()
  } catch (error) {
    expect(error).toBe("Can't load issues")
  }





});

})
