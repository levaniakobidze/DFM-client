import { useMutation } from "@tanstack/react-query";
import { createSubmission, CreateSubmissionInput } from "@/services/submission.service";

export function useCreateSubmission() {
  return useMutation({
    mutationFn: (input: CreateSubmissionInput) => createSubmission(input),
  });
}
