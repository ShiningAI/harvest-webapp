"use server";

export interface ExceptionError extends Error {
  data?: string;
}

export const notifyException = async (error: ExceptionError) => {
  try {
    const content = `<font color="warning">Webapp 异常通知</font>
    <font color="info">Name:</font> ${error.name}
    <font color="info">Message:</font> ${error.message}
    <font color="info">Data:</font> ${error.data}
    
    \`\`\`
    ${error.stack}
    \`\`\`
    `;
    const params = {
      msgtype: "markdown",
      markdown: { content },
    };
    const resp = await fetch(process.env.WECOM_BOT_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await resp.json();
    return { ok: true, data };
  } catch (error: any) {
    await notifyException(error).catch(console.error);
    return { ok: false, error: error.message };
  }
};
