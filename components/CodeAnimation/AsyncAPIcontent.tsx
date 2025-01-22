export default function renderAsyncAPIContent() {
    return (
        <div className="font-mono text-sm leading-relaxed">
        <div className="text-[#98c379]">&quot;asyncapi&quot;: &quot;2.5.0&quot;,</div>
        <div className="text-[#98c379]">&quot;info&quot;: {'{'}</div>
        <div className="ml-4 text-[#98c379]">&quot;title&quot;: &quot;Streetlights API&quot;,</div>
        <div className="ml-4 text-[#98c379]">&quot;version&quot;: &quot;1.0.0&quot;,</div>
        <div className="ml-4 text-[#98c379]">&quot;description&quot;: &quot;The Streetlighting API allow you to remotely manage the city lights.&quot;,</div>
        <div className="ml-4 text-[#98c379]">&quot;license&quot;: &quot;Apache 2.0&quot;,</div>
        <div className="text-[#98c379]">{'}'}</div>
        <div className="text-[#98c379]">&quot;servers&quot;: {'{'}</div>
        <div className="ml-4 text-[#98c379]">&quot;mosquitto&quot;: {'{'}</div>
        <div className="ml-8 text-[#98c379]">&quot;url&quot;: &quot;mqtt://test.mosquitto.org&quot;,</div>
        <div className="ml-8 text-[#98c379]">&quot;protocol&quot;: &quot;mqtt&quot;</div>
        <div className="ml-4 text-[#98c379]">{'}'}</div>
        <div className="text-[#98c379]">{'}'}</div>
      </div>
    )
}