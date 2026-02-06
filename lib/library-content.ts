import type { FunFact, MythFact, Article } from './library-types'

// ─────────────────────────────────────────────
// FUN FACTS
// ─────────────────────────────────────────────
export const funFacts: FunFact[] = [
  {
    id: 'ff-1',
    category: 'fun-facts',
    text: 'The average person who menstruates will have around 450 periods in their lifetime. That is roughly 7 years of menstruation total.',
    cycleRelevance: ['all'],
    tags: ['general', 'perspective'],
  },
  {
    id: 'ff-2',
    category: 'fun-facts',
    text: 'Your voice can subtly change across your menstrual cycle. Some research suggests it may sound slightly different around ovulation.',
    cycleRelevance: ['ovulation'],
    tags: ['body', 'ovulation'],
  },
  {
    id: 'ff-3',
    category: 'fun-facts',
    text: 'Period blood is not just blood. It contains cervical mucus, vaginal secretions, and endometrial tissue. It is a unique fluid.',
    cycleRelevance: ['period'],
    tags: ['period', 'biology'],
  },
  {
    id: 'ff-4',
    category: 'fun-facts',
    text: 'Your sense of smell may become sharper during the luteal phase. Some people notice stronger reactions to certain scents before their period.',
    cycleRelevance: ['luteal'],
    tags: ['luteal', 'senses'],
  },
  {
    id: 'ff-5',
    category: 'fun-facts',
    text: 'The uterus is approximately the size of a pear when not pregnant, but it can expand to the size of a watermelon during pregnancy.',
    cycleRelevance: ['all'],
    tags: ['anatomy', 'general'],
  },
  {
    id: 'ff-6',
    category: 'fun-facts',
    text: 'Craving chocolate before your period is incredibly common. It may be linked to drops in magnesium levels during the luteal phase.',
    cycleRelevance: ['luteal', 'period'],
    tags: ['cravings', 'food'],
  },
  {
    id: 'ff-7',
    category: 'fun-facts',
    text: 'Your pain threshold can shift across your cycle. Many people experience higher pain sensitivity in the days leading up to their period.',
    cycleRelevance: ['luteal'],
    tags: ['pain', 'body'],
  },
  {
    id: 'ff-8',
    category: 'fun-facts',
    text: 'In the follicular phase, rising estrogen can boost energy, creativity, and sociability. Some people call it their "spring season."',
    cycleRelevance: ['follicular'],
    tags: ['energy', 'follicular'],
  },
  {
    id: 'ff-9',
    category: 'fun-facts',
    text: 'The endometrium (uterine lining) is one of the fastest-growing tissues in the human body. It rebuilds itself every single cycle.',
    cycleRelevance: ['follicular'],
    tags: ['biology', 'anatomy'],
  },
  {
    id: 'ff-10',
    category: 'fun-facts',
    text: 'Sleep quality often changes across the cycle. Progesterone, which rises after ovulation, can make you feel drowsier.',
    cycleRelevance: ['luteal'],
    tags: ['sleep', 'luteal'],
  },
  {
    id: 'ff-11',
    category: 'period-basics',
    text: 'A "normal" cycle length ranges from 21 to 35 days. There is no single perfect number. Your normal is personal.',
    cycleRelevance: ['all'],
    tags: ['basics', 'cycle-length'],
  },
  {
    id: 'ff-12',
    category: 'exercise-energy',
    text: 'Light movement like walking or gentle yoga during your period can actually help reduce cramp intensity for many people.',
    cycleRelevance: ['period'],
    tags: ['exercise', 'cramps'],
  },
  {
    id: 'ff-13',
    category: 'skin-hair',
    text: 'Breakouts around your period are linked to a drop in estrogen and a relative rise in androgens. It is not about being "dirty."',
    cycleRelevance: ['luteal', 'period'],
    tags: ['skin', 'hormones'],
  },
  {
    id: 'ff-14',
    category: 'food-cravings',
    text: 'Your metabolism slightly increases during the luteal phase. This is why you might feel hungrier before your period. Your body genuinely needs more fuel.',
    cycleRelevance: ['luteal'],
    tags: ['metabolism', 'cravings'],
  },
  {
    id: 'ff-15',
    category: 'pms-mood-emotions',
    text: 'PMS affects up to 90% of people who menstruate in some form. You are definitely not alone in feeling it.',
    cycleRelevance: ['luteal'],
    tags: ['pms', 'mood'],
  },
  {
    id: 'ff-16',
    category: 'fun-facts',
    text: 'Humans are one of only a few species that menstruate. Most other mammals reabsorb the uterine lining instead of shedding it.',
    cycleRelevance: ['all'],
    tags: ['biology', 'fun'],
  },
]

// ─────────────────────────────────────────────
// MYTH VS FACT CARDS
// ─────────────────────────────────────────────
export const mythFacts: MythFact[] = [
  {
    id: 'mf-1',
    category: 'myths-facts',
    myth: 'You should not exercise during your period.',
    fact: 'Gentle exercise can actually help reduce cramps, boost mood, and improve energy. Listen to your body and move at your own pace.',
    whyMythExists: 'Historically, menstruation was treated as an illness. People were told to rest completely, which led to the belief that any physical activity was harmful.',
    cycleRelevance: ['period'],
    tags: ['exercise', 'period'],
  },
  {
    id: 'mf-2',
    category: 'myths-facts',
    myth: 'Period blood is dirty or impure.',
    fact: 'Period blood is a natural mix of blood, uterine tissue, and mucus. It is not toxic, dirty, or dangerous in any way.',
    whyMythExists: 'Many cultures historically attached shame and taboo to menstruation, framing it as unclean. These beliefs persist in some communities today.',
    cycleRelevance: ['period'],
    tags: ['period', 'stigma'],
  },
  {
    id: 'mf-3',
    category: 'myths-facts',
    myth: 'PMS is just in your head.',
    fact: 'PMS is caused by real hormonal fluctuations, especially shifts in estrogen and progesterone. The symptoms are physical, emotional, and completely valid.',
    whyMythExists: 'Women\'s health complaints have historically been dismissed or minimized. This led to the misconception that PMS symptoms are exaggerated or imaginary.',
    cycleRelevance: ['luteal'],
    tags: ['pms', 'mood', 'validation'],
  },
  {
    id: 'mf-4',
    category: 'myths-facts',
    myth: 'You cannot get pregnant during your period.',
    fact: 'While less likely, it is possible, especially for people with shorter cycles. Sperm can survive for up to 5 days in the body.',
    whyMythExists: 'Because ovulation typically occurs mid-cycle, people assumed the period was a "safe" window. But cycle timing varies, and biology is not a calendar.',
    cycleRelevance: ['period'],
    tags: ['fertility', 'period'],
  },
  {
    id: 'mf-5',
    category: 'myths-facts',
    myth: 'Your cycle should be exactly 28 days.',
    fact: 'Cycles between 21 and 35 days are considered typical. Many factors like stress, sleep, and nutrition can influence cycle length.',
    whyMythExists: 'The 28-day cycle became a textbook standard for simplicity. In reality, most people do not have a perfectly regular 28-day cycle.',
    cycleRelevance: ['all'],
    tags: ['cycle-length', 'basics'],
  },
  {
    id: 'mf-6',
    category: 'myths-facts',
    myth: 'Cravings before your period mean you lack willpower.',
    fact: 'Increased appetite and cravings during the luteal phase are driven by hormonal shifts and a slight rise in metabolism. Your body is asking for what it needs.',
    whyMythExists: 'Diet culture frames cravings as weakness. In reality, hormonal hunger is a normal biological response, not a character flaw.',
    cycleRelevance: ['luteal'],
    tags: ['cravings', 'food', 'self-compassion'],
  },
  {
    id: 'mf-7',
    category: 'myths-facts',
    myth: 'You should not swim during your period.',
    fact: 'Swimming during your period is completely safe. Water pressure can actually slow flow temporarily, and tampons or menstrual cups work well in water.',
    whyMythExists: 'Concerns about hygiene and visibility led to this myth. Modern period products make swimming comfortable and practical.',
    cycleRelevance: ['period'],
    tags: ['exercise', 'period', 'swimming'],
  },
  {
    id: 'mf-8',
    category: 'myths-facts',
    myth: 'Irregular periods always mean something is wrong.',
    fact: 'Some irregularity is normal, especially during puberty, postpartum, and perimenopause. Stress, travel, and lifestyle changes can also cause temporary shifts.',
    whyMythExists: 'The emphasis on "regular" cycles creates anxiety around natural variation. While persistent changes are worth discussing with a professional, occasional irregularity is common.',
    cycleRelevance: ['all'],
    tags: ['cycle-length', 'anxiety', 'reassurance'],
  },
  {
    id: 'mf-9',
    category: 'myths-facts',
    myth: 'Hormonal changes only affect your mood.',
    fact: 'Hormones influence digestion, skin, sleep, energy, pain perception, creativity, and even your immune system across the cycle.',
    whyMythExists: 'The emotional dimension of PMS gets the most attention, which overshadows the wide range of physical effects hormones have on the whole body.',
    cycleRelevance: ['all'],
    tags: ['hormones', 'whole-body'],
  },
  {
    id: 'mf-10',
    category: 'myths-facts',
    myth: 'You lose a lot of blood during your period.',
    fact: 'The average total blood loss during a period is about 30 to 80 ml, roughly 2 to 5 tablespoons. It often looks like more than it is.',
    whyMythExists: 'The visual appearance of period blood, mixed with other fluids, can make it seem like a larger volume than it actually is.',
    cycleRelevance: ['period'],
    tags: ['period', 'basics'],
  },
]

// ─────────────────────────────────────────────
// SHORT ARTICLES
// ─────────────────────────────────────────────
export const articles: Article[] = [
  {
    id: 'art-1',
    slug: 'why-mood-changes-across-cycle',
    category: 'pms-mood-emotions',
    title: 'Why your mood changes across your cycle',
    subtitle: 'It is not random. It is hormonal, and it is completely valid.',
    readTimeMinutes: 3,
    pullQuote: 'Your emotions are not "too much." They are a natural response to a changing hormonal landscape.',
    cycleRelevance: ['all'],
    tags: ['mood', 'hormones', 'self-compassion'],
    sections: [
      {
        body: 'If you have ever noticed that your mood shifts throughout the month, you are not imagining it. Hormonal changes across the menstrual cycle have a real effect on how you feel, and understanding this can be incredibly reassuring.',
      },
      {
        heading: 'The follicular phase: a fresh start',
        body: 'After your period ends, estrogen begins to rise steadily. Many people notice a lift in energy, optimism, and motivation during this time. You may feel more social, creative, and open to new experiences. Think of it as your body\'s natural "spring."',
      },
      {
        heading: 'Around ovulation: peak confidence',
        body: 'Estrogen peaks just before ovulation, often bringing with it a sense of confidence and wellbeing. Some people feel more articulate, energetic, and emotionally resilient during this window.',
      },
      {
        heading: 'The luteal phase: turning inward',
        body: 'After ovulation, progesterone rises and estrogen starts to decline. This can bring a shift toward introspection, sensitivity, and sometimes irritability or sadness. These feelings are not weakness. They are your body adjusting to a significant hormonal transition.',
      },
      {
        heading: 'PMS and the pre-period window',
        body: 'In the days before your period, both hormones drop sharply. This is when PMS symptoms are most common. You might feel tearful, anxious, or frustrated. It is also common to feel physically drained. Be gentle with yourself during this time.',
      },
      {
        heading: 'What you can do',
        body: 'Tracking your mood alongside your cycle can help you anticipate shifts rather than being caught off guard. On harder days, give yourself permission to slow down. You do not need to perform at the same level every day of the month.',
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'is-period-blood-dirty',
    category: 'period-basics',
    title: 'Is period blood actually dirty?',
    subtitle: 'Spoiler: no. And here is why that matters.',
    readTimeMinutes: 2,
    pullQuote: 'Period blood is not waste. It is a sign that your body is functioning exactly as it should.',
    cycleRelevance: ['period'],
    tags: ['period', 'stigma', 'basics'],
    sections: [
      {
        body: 'This is one of the most persistent myths about menstruation, and it causes real harm. The idea that period blood is "dirty" or "impure" has been used to shame and exclude people who menstruate for centuries. Let us set the record straight.',
      },
      {
        heading: 'What period blood actually is',
        body: 'Period blood is a combination of blood, endometrial tissue (the lining of the uterus), cervical mucus, and vaginal secretions. It is not "used" blood or toxic waste. It is tissue your body built and then shed as part of a completely normal cycle.',
      },
      {
        heading: 'Why the colour and texture vary',
        body: 'You may notice that period blood can be bright red, dark brown, or even slightly orange. It can be thin or contain small clots. All of this is normal. The colour and consistency depend on how quickly the blood leaves your body and how long it has been exposed to air.',
      },
      {
        heading: 'Why this myth persists',
        body: 'Cultural and religious taboos around menstruation have existed for thousands of years. In many communities, people on their period were (and sometimes still are) isolated or told they are unclean. These beliefs have no medical basis.',
      },
      {
        heading: 'The bottom line',
        body: 'Your period is not dirty, shameful, or something to hide. Understanding what is happening in your body can replace anxiety with confidence. You deserve to feel neutral, even positive, about a process that is entirely natural.',
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'pms-not-just-in-your-head',
    category: 'pms-mood-emotions',
    title: 'Why PMS is not "just in your head"',
    subtitle: 'Your symptoms are real. Science agrees.',
    readTimeMinutes: 3,
    pullQuote: 'Dismissing PMS dismisses the lived experience of millions of people. Your body is not lying to you.',
    cycleRelevance: ['luteal'],
    tags: ['pms', 'validation', 'mood'],
    sections: [
      {
        body: 'If anyone has ever told you that PMS is "not real" or "all in your head," you have probably felt dismissed and frustrated. Here is what science actually says about it.',
      },
      {
        heading: 'The hormonal reality',
        body: 'PMS is driven by the drop in estrogen and progesterone that happens after ovulation. These hormones influence serotonin, the neurotransmitter that affects mood, sleep, and appetite. When hormone levels fall, serotonin can dip too, which contributes to the emotional and physical symptoms of PMS.',
      },
      {
        heading: 'It is not just mood',
        body: 'PMS can include bloating, breast tenderness, headaches, fatigue, digestive changes, and trouble concentrating, in addition to emotional symptoms like irritability, sadness, and anxiety. It affects the whole body, not just the mind.',
      },
      {
        heading: 'Why it gets dismissed',
        body: 'Historically, women\'s health concerns have been minimized or attributed to emotional instability. This legacy of dismissal still affects how PMS is perceived today, both by others and sometimes by the people experiencing it.',
      },
      {
        heading: 'What validation looks like',
        body: 'You do not need to "push through" every symptom. Rest is productive. Slowing down is not laziness. If your symptoms are severe enough to disrupt your daily life, a healthcare professional can help explore options. You deserve to be believed.',
      },
    ],
  },
  {
    id: 'art-4',
    slug: 'skin-changes-across-cycle',
    category: 'skin-hair',
    title: 'Why your skin changes throughout the month',
    subtitle: 'Breakouts, glow, dryness. It is all connected to your cycle.',
    readTimeMinutes: 3,
    pullQuote: 'Your skin is not misbehaving. It is responding to hormonal shifts that happen every single cycle.',
    cycleRelevance: ['all'],
    tags: ['skin', 'hormones', 'self-care'],
    sections: [
      {
        body: 'If your skin seems to have a mind of its own, changing from clear to congested within the same month, your menstrual cycle is likely playing a role. Understanding the connection can help you work with your skin instead of against it.',
      },
      {
        heading: 'Period phase: reset mode',
        body: 'During your period, hormone levels are at their lowest. Skin can feel dry, dull, or sensitive. This is a good time for gentle, hydrating products. Skip anything harsh or exfoliating.',
      },
      {
        heading: 'Follicular phase: the glow begins',
        body: 'As estrogen rises, your skin often starts to look brighter and more hydrated. Many people notice fewer breakouts and a smoother texture during this time. Estrogen supports collagen production and skin elasticity.',
      },
      {
        heading: 'Ovulation: peak glow',
        body: 'Around ovulation, estrogen peaks and many people experience their clearest, most radiant skin. Pores may appear smaller and skin tends to look plump and healthy.',
      },
      {
        heading: 'Luteal phase: the pre-period shift',
        body: 'After ovulation, progesterone rises and can increase oil production. Combined with a drop in estrogen, this creates the conditions for hormonal breakouts, especially along the jawline and chin. This is one of the most common skin-cycle patterns.',
      },
      {
        heading: 'What you can do',
        body: 'Adjusting your skincare routine across your cycle can make a real difference. Use gentler products during your period, enjoy the glow in the follicular phase, and consider lighter, non-comedogenic products in the luteal phase. And remember: breakouts during PMS are hormonal, not a reflection of your hygiene.',
      },
    ],
  },
  {
    id: 'art-5',
    slug: 'exercise-and-your-cycle',
    category: 'exercise-energy',
    title: 'How to work with your energy across your cycle',
    subtitle: 'Your body is not the same every day. That is a feature, not a flaw.',
    readTimeMinutes: 3,
    pullQuote: 'Rest is not the opposite of progress. It is part of it.',
    cycleRelevance: ['all'],
    tags: ['exercise', 'energy', 'movement'],
    sections: [
      {
        body: 'If you have ever felt unstoppable one week and exhausted the next, your menstrual cycle may be a factor. Energy levels naturally fluctuate across the month, and understanding these patterns can help you plan movement that feels good rather than forced.',
      },
      {
        heading: 'Period: gentle is enough',
        body: 'Energy is typically at its lowest during menstruation. Walking, stretching, restorative yoga, or simply resting are all valid choices. If you feel like doing more, that is fine too. The key is listening to your body without judgment.',
      },
      {
        heading: 'Follicular: building momentum',
        body: 'As estrogen rises, energy tends to increase. This is often when people feel most motivated to try new workouts, push a little harder, or enjoy high-energy activities. Take advantage of this natural boost if it feels right.',
      },
      {
        heading: 'Ovulation: peak performance',
        body: 'Many people experience their highest energy and strength around ovulation. This can be a great time for more intense workouts, social sports, or activities that require coordination and endurance.',
      },
      {
        heading: 'Luteal: winding down',
        body: 'After ovulation, progesterone rises and energy may gradually decrease. You might prefer moderate activities like swimming, cycling, or yoga. In the days before your period, lower-intensity movement can help manage PMS symptoms without adding stress.',
      },
      {
        heading: 'The takeaway',
        body: 'There is no rule that says you need to perform at the same level every day. Matching your movement to your energy is not making excuses. It is working with your biology, and that is a strength.',
      },
    ],
  },
  {
    id: 'art-6',
    slug: 'cravings-are-not-weakness',
    category: 'food-cravings',
    title: 'Why cravings are not a sign of weakness',
    subtitle: 'Your body is asking for something. That is worth listening to.',
    readTimeMinutes: 2,
    pullQuote: 'Honouring a craving is not failure. It is a conversation with your body.',
    cycleRelevance: ['luteal', 'period'],
    tags: ['food', 'cravings', 'self-compassion'],
    sections: [
      {
        body: 'If you find yourself reaching for chocolate, carbs, or comfort food before your period, you are not lacking discipline. Cravings during the luteal phase and period are a well-documented biological response.',
      },
      {
        heading: 'What is happening in your body',
        body: 'During the luteal phase, your basal metabolic rate slightly increases. Your body is using more energy, even at rest. At the same time, serotonin levels can dip due to hormonal shifts, and carbohydrate-rich foods help boost serotonin production. In other words, your body has a biological reason for wanting that toast or chocolate.',
      },
      {
        heading: 'The diet culture trap',
        body: 'Diet culture frames cravings as something to resist or feel guilty about. But ignoring your body\'s signals can lead to a restrict-binge cycle that is far more harmful than eating what you are craving. Gentle nutrition means nourishing yourself with a mix of what your body needs and what it wants.',
      },
      {
        heading: 'What you can do',
        body: 'Try to approach cravings with curiosity rather than judgment. If you are craving something sweet, have it. If you want a warm, comforting meal, make one. You can also support stable energy by including protein, fibre, and healthy fats alongside your cravings. But the most important thing is: you are allowed to eat what feels good.',
      },
    ],
  },
  {
    id: 'art-7',
    slug: 'understanding-cycle-phases',
    category: 'cycle-phases',
    title: 'The four phases of your cycle, simply explained',
    subtitle: 'A quick, friendly guide to what is happening in your body each week.',
    readTimeMinutes: 4,
    pullQuote: 'Your cycle is not just about your period. It is a full-month experience that affects almost everything.',
    cycleRelevance: ['all'],
    tags: ['basics', 'cycle-phases', 'education'],
    sections: [
      {
        body: 'Many people think of their menstrual cycle as just their period, but it is actually a continuous process with four distinct phases. Each phase brings its own hormonal shifts, and understanding them can help you feel more in tune with your body.',
      },
      {
        heading: 'Menstrual phase (your period)',
        body: 'This is the phase most people are familiar with. The uterine lining sheds, causing bleeding that typically lasts 3 to 7 days. Hormone levels are at their lowest. You might feel tired, achy, or introspective. This is a natural time to rest and recharge.',
      },
      {
        heading: 'Follicular phase',
        body: 'Overlapping with and following your period, the follicular phase is when your body prepares for ovulation. Estrogen rises, bringing increased energy, improved mood, and often a sense of optimism. Many people feel their most productive and social during this time.',
      },
      {
        heading: 'Ovulation',
        body: 'Around the middle of your cycle, a mature egg is released from an ovary. Estrogen peaks, and you may notice a boost in confidence, energy, and even libido. This phase is brief, usually lasting 1 to 3 days, but it is often when people feel their best.',
      },
      {
        heading: 'Luteal phase',
        body: 'After ovulation, progesterone rises to prepare the uterus for a potential pregnancy. If pregnancy does not occur, both hormones drop, which can trigger PMS symptoms. Energy gradually decreases, and you may feel more introverted, emotional, or physically uncomfortable.',
      },
      {
        heading: 'Why this matters',
        body: 'Knowing which phase you are in can help you plan your week, manage expectations, and treat yourself with more compassion. You are not inconsistent. You are cyclical, and that is perfectly natural.',
      },
    ],
  },
  {
    id: 'art-8',
    slug: 'digestion-and-your-cycle',
    category: 'food-cravings',
    title: 'Why your digestion changes across your cycle',
    subtitle: 'Bloating, constipation, and "period poops" are all normal.',
    readTimeMinutes: 2,
    pullQuote: 'If your digestion feels different every week, your hormones may be the reason.',
    cycleRelevance: ['all'],
    tags: ['digestion', 'bloating', 'body'],
    sections: [
      {
        body: 'If you have noticed that your digestion seems to have a personality of its own throughout the month, you are not imagining it. Hormonal fluctuations across your cycle directly affect your gut.',
      },
      {
        heading: 'Progesterone and constipation',
        body: 'During the luteal phase, rising progesterone slows down the smooth muscle contractions in your intestines. This can lead to bloating, constipation, and a general feeling of sluggishness in your digestion.',
      },
      {
        heading: 'Prostaglandins and period poops',
        body: 'When your period starts, prostaglandins are released to help the uterus contract and shed its lining. But these chemicals can also affect nearby intestinal muscles, leading to looser stools, urgency, or cramping. This is extremely common and completely normal.',
      },
      {
        heading: 'What can help',
        body: 'Staying hydrated, eating fibre-rich foods, and gentle movement can support digestion throughout your cycle. During the luteal phase, warming foods and herbal teas may feel especially comforting. And during your period, go easy on yourself if your gut is unpredictable.',
      },
    ],
  },
]
