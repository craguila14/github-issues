import { Injectable, signal } from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { getIssueByNumber } from "../action";
import { getIssueCommentsByNumber } from "../action/get-issue-comment-by-number.action";

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  private issueNumber = signal<string | null>(null)

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    //enabled hace que no se dispare la query hasta que el issue number sea diferente de null
    enabled: !this.issueNumber() !== null
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

}
