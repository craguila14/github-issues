import { inject, Injectable, signal } from "@angular/core";
import { injectQuery, injectQueryClient, QueryClient } from "@tanstack/angular-query-experimental";
import { getIssueByNumber } from "../action";
import { getIssueCommentsByNumber } from "../action/get-issue-comment-by-number.action";
import { GitHubIssue } from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  private issueNumber = signal<string | null>(null)
  private queryClient = inject(QueryClient)

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    //enabled hace que no se dispare la query hasta que el issue number sea diferente de null
    enabled: !this.issueNumber() !== null,
    staleTime: 1000 * 60 * 5
  }))


   IssueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    //enabled hace que no se dispare la query hasta que el issue number sea diferente de null
    enabled: !this.issueNumber() !== null
  }))

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId)
  }

  prefetchIssue(issueId: string) {

    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5
    })

  }

  setIssueData(issue: GitHubIssue) {
    this.queryClient.setQueryData(
      ['issue', issue.number.toString()], issue, {
        updatedAt: Date.now() + 1000 * 60
      }
    )
  }




}
