import type { NotificationType } from "@/services/notification.service";

/** Replace `{{key}}` placeholders in a template string. */
export function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

type MsgTemplates = {
  msgDareAccepted: string;
  msgSubmissionApproved: string;
  msgRewardReceived: string;
  msgSubmissionRejected: string;
  msgAccountBlocked: string;
  msgAccountPaused: string;
  msgAccountReactivated: string;
};

/**
 * Server stores English messages. Parse known patterns and render using locale templates.
 * Falls back to raw `message` if parsing fails (unknown format / future types).
 */
export function localizeNotificationBody(
  type: NotificationType,
  message: string,
  msg: MsgTemplates
): string {
  switch (type) {
    case "DARE_ACCEPTED": {
      const m = message.match(/^(.+) accepted your dare "(.+)"$/);
      if (m) {
        return interpolate(msg.msgDareAccepted, { user: m[1], title: m[2] });
      }
      break;
    }
    case "SUBMISSION_APPROVED": {
      const m = message.match(/^Your proof for "(.+)" was approved!$/);
      if (m) {
        return interpolate(msg.msgSubmissionApproved, { title: m[1] });
      }
      break;
    }
    case "REWARD_RECEIVED": {
      const m = message.match(/^You earned \$([\d.]+) for completing "(.+)"$/);
      if (m) {
        return interpolate(msg.msgRewardReceived, { amount: m[1], title: m[2] });
      }
      break;
    }
    case "SUBMISSION_REJECTED": {
      const m = message.match(/^Your proof for "(.+)" was rejected\.$/);
      if (m) {
        return interpolate(msg.msgSubmissionRejected, { title: m[1] });
      }
      break;
    }
    case "ACCOUNT_BLOCKED":
      return msg.msgAccountBlocked;
    case "ACCOUNT_PAUSED":
      return msg.msgAccountPaused;
    case "ACCOUNT_REACTIVATED":
      return msg.msgAccountReactivated;
    default:
      break;
  }
  return message;
}

export function localizeNotificationRelativeTime(
  dateStr: string,
  rel: {
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    yesterday: string;
    daysAgo: string;
  }
): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return rel.justNow;
  if (m < 60) return interpolate(rel.minutesAgo, { n: String(m) });
  const h = Math.floor(m / 60);
  if (h < 24) return interpolate(rel.hoursAgo, { n: String(h) });
  const d = Math.floor(h / 24);
  if (d === 1) return rel.yesterday;
  return interpolate(rel.daysAgo, { n: String(d) });
}
