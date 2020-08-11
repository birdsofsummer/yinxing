qs=([h,...t])=> h != undefined ? [...qs(t.filter(x=>x<=h)),h,...qs(t.filter(x=>x>h))]:[]
