const routeData = {
  hangzhou: { origin: '杭州', distance: 3850, drive: '48–55', gap: '省约 600–700', headline: '更接近“还能玩”的版本', reason: '杭州到武汉的西进段更短，回程压力也更低；即便如此，7 天仍需要把城市游玩压缩成半天到一天。' },
  wenzhou: { origin: '温州', distance: 4500, drive: '56–64', gap: '增加约 600–700', headline: '更像一次公路耐力赛', reason: '温州需要先向北接入主通道，往返总里程和返程疲劳明显增加；若坚持三城，建议至少延长到 9–10 天。' }
};
const days = [
  {n:'D1', title:'杭州 → 武汉', meta:'约 730 km · 8.5–10 h 估算', body:'05:30 出发，优先错开杭州出城与沪渝通道早高峰；午间在服务区完整休息 40–60 分钟，预计 16:00–18:00 抵达武汉。', play:'夜游江汉路 / 长江大桥远眺，早点睡。', rest:'建议：每 2 小时轮换驾驶；补能放在服务区，不要进城后再找。', risk:'10 月 1 日上午高速出城潮最明显，实际到达可能向后顺延。'},
  {n:'D2', title:'武汉城市日', meta:'城市内移动 · 不安排长途驾驶', body:'上午黄鹤楼或东湖二选一；下午留给江滩、粮道街或汉口历史街区。把“必去”控制在 2–3 个点。', play:'江城夜色、热干面、长江边散步。', rest:'建议：车辆停好后尽量步行 / 公共交通，避免在核心区反复挪车。', risk:'热门景区预约与停车紧张，提前确认开放时间。'},
  {n:'D3', title:'武汉 → 西安', meta:'约 730 km · 8.5–10 h 估算', body:'06:00 出发，沿福银 / 沪陕方向西进；午后经过山区路段时降低车速，预计 17:00–19:00 抵达西安。', play:'钟鼓楼片区短停，晚餐后休息。', rest:'建议：午餐后至少闭目休息 20 分钟，山区不要连续超车。', risk:'返程与进城叠加，西安绕城可能出现排队，不要把景点预约排在到达当晚。'},
  {n:'D4', title:'西安城市日', meta:'城市内移动 · 不安排长途驾驶', body:'城墙骑行 / 大唐不夜城 / 陕西历史博物馆三选二；兵马俑若要去，需把当天节奏再放慢。', play:'古都夜游，保留体力给次日西进。', rest:'建议：景点之间减少跨城折返；下午 16:00 后不再安排远距离移动。', risk:'国庆热门景区客流大，预约、安检、步行距离都会放大时间成本。'},
  {n:'D5', title:'西安 → 兰州', meta:'约 630 km · 7.5–9 h 估算', body:'06:30 出发，途经陇西、定西方向；山区与长下坡较多，预计 16:00–18:00 抵达兰州。', play:'黄河风情线、正宁路 / 大众巷夜食。', rest:'建议：进甘肃后关注风沙与降温，服务区补水并检查胎压。', risk:'兰州进城道路与停车位紧张，住宿尽量选择带车位、靠近主路的位置。'},
  {n:'D6', title:'兰州半日 → 返程起步', meta:'兰州 → 西安 / 宝鸡方向 · 约 500–650 km', body:'清晨黄河边短走后，09:00 前离开兰州，尽量把返程第一段推进到宝鸡或西安周边；不要为了“多玩一处”拖到中午。', play:'黄河母亲雕像 / 白塔山二选一。', rest:'建议：把当天视为返程日，至少 1 次 60 分钟长休息，夜间不硬撑。', risk:'若 10 月 6 日下午才离开兰州，D7 回杭州几乎必然变成高风险长途。'},
  {n:'D7', title:'西安 / 宝鸡 → 杭州', meta:'约 1,200–1,450 km · 14–18 h 估算', body:'这是整个版本的硬伤：即使凌晨出发，叠加节假日返程流量，也不应把尚未由 2026 节前公告确认的收费优惠当成必须达成的目标。', play:'无。把安全抵达当成唯一任务。', rest:'建议：拆成两天，或在 10 月 6 日提前推进到襄阳 / 武汉附近，再分段返杭。', risk:'强烈不建议单驾驶员完成。若疲劳或天气不佳，主动接受部分收费并住宿。'}
];
const checklist = ['确认车辆座位数与行驶证性质','检查胎压、雨刮、灯光与备胎','下载离线地图 / 备好充电或加油卡','每 2 小时安排一次休息','提前预约热门景点与住宿','准备儿童 / 老人常用药和饮水','确认 D6 返程推进点','不以收费优惠替代安全决策'];
let origin = 'hangzhou';
let energy = 'fuel';
const $ = (selector) => document.querySelector(selector);
function renderDays(){
  $('#dayList').innerHTML = days.map((day, index) => `<details class="day-item" ${index === 0 ? 'open' : ''}><summary class="day-summary"><span class="day-number">${day.n}</span><span><span class="day-title">${day.title}</span><span class="day-meta">${day.meta}</span></span><span class="day-chevron">›</span></summary><div class="day-body"><div><h4>怎么走</h4><p>${day.body}</p><h4>游玩重点</h4><p>${day.play}</p></div><div><h4>补能 / 休息</h4><p>${day.rest}</p><p class="risk"><strong>风险：</strong>${day.risk}</p></div></div></details>`).join('');
}
function updateOrigin(next){
  origin = next;
  const data = routeData[next];
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.origin === next));
  $('#originName').textContent = data.origin; $('#mapOrigin').textContent = data.origin; $('#originHeadline').textContent = data.headline; $('#originReason').textContent = data.reason;
  $('#originDistance').textContent = `约 ${data.distance.toLocaleString()}`; $('#originDrive').textContent = `约 ${data.drive}`; $('#originGap').textContent = data.gap;
}
function updateEnergy(next){
  energy = next;
  document.querySelectorAll('.energy-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.energy === next));
  const isFuel = next === 'fuel'; $('#consumption').value = isFuel ? 8.2 : 17; $('#unitPrice').value = isFuel ? 8.2 : 0.72; $('#consumptionUnit').textContent = isFuel ? 'L / 100km' : 'kWh / 100km'; $('#priceUnit').textContent = isFuel ? '元 / L' : '元 / kWh'; updateCost();
}
function updateCost(){
  const distance = routeData[origin].distance; const consumption = Number($('#consumption').value) || 0; const price = Number($('#unitPrice').value) || 0; const total = Math.round(distance * consumption / 100 * price); $('#costTotal').textContent = `¥${total.toLocaleString()}`;
}
function updateChecklist(){
  const checked = [...document.querySelectorAll('#checkList input:checked')].length; $('#progressText').textContent = `${checked} / ${checklist.length}`; $('#progressBar').style.width = `${checked / checklist.length * 100}%`;
  localStorage.setItem('roadtrip-checks', JSON.stringify([...document.querySelectorAll('#checkList input')].map(input => input.checked)));
}
function renderChecklist(){
  const saved = JSON.parse(localStorage.getItem('roadtrip-checks') || '[]'); $('#checkList').innerHTML = checklist.map((item, index) => `<label class="check-item"><input type="checkbox" ${saved[index] ? 'checked' : ''}><span>${item}</span></label>`).join(''); document.querySelectorAll('#checkList input').forEach(input => input.addEventListener('change', updateChecklist)); updateChecklist();
}
function updateCountdown(){
  const now = new Date(); const start = new Date('2026-10-01T00:00:00+08:00'); const end = new Date('2026-10-08T00:00:00+08:00'); let target = start; let label = '距离假期开始';
  if(now >= start && now < end){ target = end; label = '距离假期结束'; } else if(now >= end){ $('#windowStatus').textContent = '假期已结束'; $('#countdown').textContent = '请以最新公告为准'; return; }
  const diff = Math.max(0, target - now); const d = Math.floor(diff / 86400000); const h = Math.floor(diff % 86400000 / 3600000); const m = Math.floor(diff % 3600000 / 60000); $('#windowStatus').textContent = label; $('#countdown').textContent = d ? `${d}天 ${h}小时` : `${h}小时 ${m}分`;
}
document.querySelectorAll('.toggle-btn').forEach(btn => btn.addEventListener('click', () => updateOrigin(btn.dataset.origin)));
document.querySelectorAll('.energy-btn').forEach(btn => btn.addEventListener('click', () => updateEnergy(btn.dataset.energy)));
$('#consumption').addEventListener('input', updateCost); $('#unitPrice').addEventListener('input', updateCost); $('#printPage').addEventListener('click', () => window.print()); $('#backTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
renderDays(); renderChecklist(); updateOrigin(origin); updateEnergy(energy); updateCountdown(); setInterval(updateCountdown, 60000);
