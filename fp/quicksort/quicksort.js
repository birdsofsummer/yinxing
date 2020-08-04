qs=([h,...t])=>h ? [x=>...qs(t.filter(x=>x<=h)),h,...qs(t.filter(x=>x>h))]:[]
