import rpc from 'adapter/onesignal'

export type SendNotificationArgs = {
  title: string
  description: string
}

const sendNotification = (data: SendNotificationArgs) => {
  return rpc({
    method: 'POST',
    url: '/one-signal/notification',
    data: JSON.stringify({
      headings: data.title,
      contents: data.description,
      included_segments: ['Total Subscriptions'],
    }),
  })
}

export default {
  sendNotification,
}
