import express from 'express';import nodemailer from "nodemailer";
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeebacksRepository } from './repositories/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feebacks-use-case';

// GET, POST, PUT, PATCH, DELETE

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar uma informação única de uma entidade
// DELETE = Deletar uma informação

export const routes = express.Router()

routes.post("/feedbacks", async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeebacksRepository = new PrismaFeebacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeebacksRepository, nodemailerMailAdapter
  )
  
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  return response.status(201).send();
});
