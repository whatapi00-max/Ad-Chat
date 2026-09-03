/** Reusable animated "..." typing indicator shown while the bot is composing a reply. */
export function TypingIndicator() {
  return (
    <div
      className="flex w-fit animate-msg-in items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-black/5"
      role="status"
      aria-label="Customer Support is typing"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-gray-400 animate-dot-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}
