import { environment } from "src/environments/environment.development"
import { getIssueByNumber } from "./get-issue-by-number.action";
import { QueryClient } from "@tanstack/angular-query-experimental";
import { GitHubIssue } from "../interfaces";

// const BASE_URL = environment.baseUrl;
// const issueNumber = '123'
// const GITHUB_TOKEN = environment.gitHubToken

// const mockIssue = {
//   id: 123,
//   number: issueNumber,
//   body: '# Hola Mundo'
// }

// describe('GetIssueByNumber action', () => {
//   it('should fetch issue successfully', async () => {

//     const requestURL = `${BASE_URL}/issues/${issueNumber}`
//     const issueResponse = new Response(JSON.stringify(mockIssue), {
//       status: 200,
//       statusText: 'OK'
//     })

//     spyOn(window, 'fetch').and.resolveTo(issueResponse)

//     const issue = await getIssueByNumber(issueNumber)
//     expect(window.fetch).toHaveBeenCalledWith(requestURL, {
//       headers: {
//         Authorization: `Bearer ${GITHUB_TOKEN}`
//       }
//     })
//   });

//     it('should not fetch issue successfully', async () => {

//     const requestURL = `${BASE_URL}/issues/${issueNumber}`
//     const issueResponse = new Response(null, {
//       status: 404,
//       statusText: 'Not Found'
//     })

//     spyOn(window, 'fetch').and.resolveTo(issueResponse)

//     try {

//        const issue = await getIssueByNumber(issueNumber)
//        expect(true).toBeFalse()
//     } catch (error) {
//       expect(error).toBe(`Can't load issue ${issueNumber}`)
//     }

//   });

// })






describe('getIssueByNumner (TanStack Query style)', () => {

  const {BASE_URL, GITHUB_TOKEN} = process.env


  // const BASE_URL = environment.baseUrl;
  const issueNumber = '123'
  // const GITHUB_TOKEN = environment.gitHubToken

  const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '# Hola Mundo'
} as unknown as GitHubIssue;

let queryClient: QueryClient;

beforeEach(() => {
  queryClient = new QueryClient()
})

it('should fetch issue successfully using QueryClient', async () => {
  spyOn(window, 'fetch').and.resolveTo(
    new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK'
    })
  )

  const result = await queryClient.fetchQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueByNumber(issueNumber)
  })

  expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${issueNumber}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });

  expect(result).toEqual(mockIssue)

});


it('should not fetch issue successfully using QueryClient', async () => {
  spyOn(window, 'fetch').and.resolveTo(
    new Response(JSON.stringify({}), {
      status: 404,
      statusText: 'Not Found'
    })
  )

  try {
   await queryClient.fetchQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueByNumber(issueNumber)
  })
  expect(true).toBeFalse()
  } catch (error) {
     expect(error).toBe(`Can't load issue ${issueNumber}`)
  }

})




})
