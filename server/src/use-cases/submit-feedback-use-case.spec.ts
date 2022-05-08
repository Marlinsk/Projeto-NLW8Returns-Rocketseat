import { SubmitFeedbackUseCase } from "./submit-feebacks-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

describe('Submit feedback', () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,5469594932104irfgv",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })

   it("should not be able to submit a feedback without a type", async () => {
     await expect(
       submitFeedback.execute({
         type: "",
         comment: "example comment",
         screenshot: "data:image/png;base64,5469594932104irfgv",
       })
     ).rejects.toThrow();
   });

   it("should not be able to submit a feedback without a comment", async () => {
     await expect(
       submitFeedback.execute({
         type: "BUG",
         comment: "",
         screenshot: "data:image/png;base64,5469594932104irfgv",
       })
     ).rejects.toThrow();
   });

   it("should not be able to submit a feedback with an invalid screenshot", async () => {
     await expect(
       submitFeedback.execute({
         type: "BUG",
         comment: "",
         screenshot: "test.jpg",
       })
     ).rejects.toThrow();
   });
})