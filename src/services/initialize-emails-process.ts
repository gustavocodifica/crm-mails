interface InitializeEmailsProcessServiceRequest {
  requestURL: string
}

export class InitializeEmailsProcessService {
  constructor() {}

  async execute({ requestURL }: InitializeEmailsProcessServiceRequest) {
    const url = new URL('/api/send-emails', requestURL)

    await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cursor: null,
      }),
    })
  }
}
