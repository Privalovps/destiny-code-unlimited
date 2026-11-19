import 'server-only';
/** Original editorial extensions, ordered I–XXII. Not measured traits or predictions. */
export type PremiumArchetype = {
  talent: string; relationships: string; money: string; growth: string; life: string; experiment: string;
};
const rows: readonly (readonly [string, string, string, string, string, string])[] = [
  [
    'The Magician explores the craft of making a first version. Resourcefulness becomes useful when you can explain which tool you chose and why. Try noticing whether you enjoy initiating, refining, or handing an idea to someone better equipped to finish it.',
    'Expression is the relationship question here: can a clear request replace a polished performance? Being persuasive does not establish agreement. Leave enough silence for another person to offer a different account, and check that the words you both use mean the same thing.',
    'Treat tools as tools rather than proof of readiness. A new purchase can support a chosen activity, but owning the equipment does not do the work. This symbol asks you to distinguish a resource you will use from an image of yourself you hope to acquire.',
    'Work with the gap between intention and demonstration. A rough attempt makes assumptions visible in a way that planning alone cannot. Describe what the attempt taught you before deciding whether it deserves more effort; a first version need not become an obligation.',
    'Authorship and responsibility belong together in this image. Notice the difference between taking initiative and needing to control every part of a shared process. The recurring question is where your contribution ends and another person can begin.',
    'Make a ten-minute prototype using only materials you already have. Record one thing the attempt clarified and one thing it did not.'
  ],
  [
    'The High Priestess offers observation as a craft: listening for what has not yet been explained. Separate a subtle impression from a conclusion. A useful practice is to keep your first interpretation provisional until you can point to the details that support it.',
    'Privacy and silence can be generous, but neither requires another person to read your mind. Ask what needs to be spoken plainly and what can remain private. An unhurried question may create more understanding than testing whether someone notices an unspoken need.',
    'The quiet appeal of an offer is different from its stated terms. Let this archetype prompt a slower reading of what is actually available, what remains unclear, and what you are assuming. Intuition can suggest a question; it cannot verify a financial claim.',
    'Give an unanswered question a defined place rather than carrying it everywhere. Write down what you know, what you suspect, and what information would help. Waiting becomes an active practice when you know what you are waiting to learn.',
    'Inner experience and public language do not always arrive at the same speed. This image makes room for an idea to mature before it is shared. It also asks when protecting an insight has turned into avoiding a conversation.',
    'Listen to a short conversation without preparing your reply. Afterward, write what was said separately from what you inferred.'
  ],
  [
    'The Empress represents the work of tending conditions. A talent to explore is making an unfinished project welcoming enough that people return to it. Care becomes concrete through materials, attention, and maintenance; ask which of those activities you actually enjoy.',
    'Care is more specific than giving without limit. Ask which gestures are welcome, which are assumed, and whether receiving feels as possible as offering. This symbol invites mutual nourishment without making one person responsible for the emotional climate of a relationship.',
    'Comfort, beauty, and generosity can carry different meanings in the same purchase. Name the need before choosing its expression. A welcoming meal, a carefully repaired object, and an expensive gift are not interchangeable simply because all can symbolize care.',
    'Protect a process from premature evaluation. Some work needs repeated attention before there is a visible result. Decide what tending looks like in ordinary terms, while leaving room to stop when the project no longer matters to you.',
    'This image links creation with upkeep. Beginning something beautiful also invites the less visible work of sustaining it. Notice which forms of maintenance feel meaningful and which have quietly become expectations that need renegotiation.',
    'Tend one neglected corner of your creative space. Choose a small change that makes returning easier, without buying anything.'
  ],
  [
    'The Emperor explores dependable structure. The skill is not making more rules; it is making a responsibility understandable and repeatable. Try explaining a process so that someone else can use it, including where judgment and exceptions remain necessary.',
    'An explicit boundary is easier to discuss than a hidden rule. Distinguish what you can commit to from what you would like someone else to do. A shared agreement leaves room for revision; authority alone does not make a relationship reciprocal.',
    'Order can make resource choices visible, yet a tidy system is not a guarantee of security. Ask which categories reflect your actual priorities and which merely look respectable. This is a values exercise, not a recommendation for managing or investing money.',
    'Review one rule by its purpose. If the purpose still matters, consider whether a simpler structure could serve it. Flexibility need not mean abandoning standards; it can mean explaining when a standard should change.',
    'The recurring theme is the difference between stewardship and possession. Holding a role does not mean owning everyone affected by it. Examine how responsibility could become more transparent, shareable, and open to questions.',
    'Write a flexible rule for one recurring task, including a sentence describing when you would deliberately make an exception.'
  ],
  [
    'The Hierophant explores translating experience into useful guidance. Teaching becomes a craft when you show how you reached an idea and invite questions about it. Consider whether you prefer preserving a tradition, interpreting it, or helping a beginner find their own language.',
    'Shared beliefs can provide a meeting place, but agreement need not be the price of belonging. Ask whether advice has been invited. Making room for a different account of the same experience can matter more than defending the lesson you took from it.',
    'Messages about respectable work and proper success often arrive before we examine them. This symbol asks whose definition of enough you are repeating. Keep the beliefs you can explain honestly, and allow inherited status markers to become questions rather than instructions.',
    'Put a familiar principle into your own words and test its limits with an ordinary example. A belief can remain meaningful while becoming less absolute. Learning here includes noticing when an old explanation no longer fits what you have observed.',
    'Belonging and independent judgment form the central conversation. A tradition may offer language without supplying every answer. Notice how you can participate in a community while remaining responsible for the claims you choose to repeat.',
    'Explain one useful idea without quoting an authority. Add one limitation and one question you would welcome from a learner.'
  ],
  [
    'The Lovers explores discernment between genuinely different values. A skill to practice is naming the tradeoff without turning one option into a villain. Choosing clearly includes recognizing what you are setting aside, even when both possibilities have something to offer.',
    'Connection does not remove difference. Try naming a preference without presenting it as the only reasonable choice. This archetype opens a conversation about consent, shared values, and the right to disagree; it supplies no information about compatibility or a partner.',
    'A resource choice can express several values at once: ease, belonging, independence, or care. Give those values names before ranking options. This symbol does not identify a correct purchase; it asks whether the reason you give matches the reason that matters to you.',
    'Notice when collecting opinions delays a choice you already understand. Clarify what is yours to decide and what needs agreement. A considered decision can remain revisable without being endlessly reopened.',
    'The theme is alignment between a stated value and an ordinary action. Alignment is not perfection. It is the willingness to notice a mismatch and decide whether your action or your stated priority needs to change.',
    'Choose a small decision and list two values that pull in different directions. Write the tradeoff you are willing to accept.'
  ],
  [
    'The Chariot offers direction as a practiced skill. Coordinating effort means defining a finish line and noticing competing demands. Ask whether you enjoy moving a project forward, keeping its parts aligned, or helping a group pause before momentum makes the choice for everyone.',
    'Moving together requires more than sharing a destination. Ask whether the pace and the method are also agreed. This image invites direct discussion of whose urgency is setting the rhythm and whether either person has room to ask for a pause.',
    'Progress can become a symbol of worth when every resource must produce visible movement. Ask what a purchase or commitment is supposed to advance. A clearly named purpose is more informative than the feeling that you ought to be doing more.',
    'Define stopping as carefully as starting. A modest finish line lets you assess an effort without continually moving the goal. Resting after completion is part of directing attention, not evidence that the original purpose has disappeared.',
    'Agency and momentum are different. A busy period may contain many actions that were never deliberately chosen. This symbol asks where a small course correction could make effort more coherent without requiring a dramatic new destination.',
    'Give one short task a visible finish line. Stop there and review what was accomplished before adding another task.'
  ],
  [
    'Strength explores measured effort under pressure. The craft is noticing how much force a situation actually needs. Patience, clear limits, and a calm explanation are different tools; none requires pretending that difficulty does not exist.',
    'Gentleness can include a firm no. This symbol asks how to express frustration without making another person responsible for containing it. Kindness is not unlimited availability, and a pause is most useful when you explain when the conversation can resume.',
    'Desire does not need to be shamed before it can be examined. Notice the difference between wanting something and needing to act immediately. This archetype invites a respectful pause around resource choices, without prescribing how you should spend or save.',
    'Practice a response that is proportionate rather than perfect. A softer tone or a shorter explanation may help you remain present. The aim of this exercise is not constant composure; it is having more than one available way to respond.',
    'Power can be expressed through restraint and care as well as action. Ask when holding steady serves a purpose and when endurance has become an expectation you should question. The symbol never asks you to tolerate harm.',
    'Draft a calm boundary in one sentence. Make it specific enough that another person would know what you are asking for.'
  ],
  [
    'The Hermit explores sustained inquiry. A useful skill is following a question beyond its first plausible answer and bringing back an explanation others can use. Solitude can support that work, but it does not make a conclusion more accurate by itself.',
    'Time alone and emotional distance are not the same request. Explain what kind of space restores your attention and how you would like to reconnect. This symbol invites clarity around privacy without making withdrawal a test of another person’s devotion.',
    'Private definitions of sufficiency may differ from visible markers of success. Ask which resources support work or time you actually value. Choosing quietly does not make a choice superior; it simply allows you to examine it without an imagined audience.',
    'Let reflection have an endpoint. After considering a question, identify one insight you could share or one detail you still need to check. Inquiry remains connected to life when it can return to conversation and ordinary action.',
    'The recurring question is when an inward search becomes ready to meet other perspectives. Independence need not mean refusing help. Notice whether you are protecting concentration or protecting a conclusion from being challenged.',
    'Spend ten quiet minutes on one question, then summarize your present answer in three sentences for someone unfamiliar with it.'
  ],
  [
    'Wheel of Fortune explores adaptation to changing conditions. A skill to practice is distinguishing a pattern you have observed from a pattern you expect. Flexible planning includes noticing when yesterday’s useful method needs a different context today.',
    'A relationship’s routines may change without either person becoming a different category of person. Ask which agreements still fit the present circumstances. This symbol supports revisiting expectations explicitly; it does not forecast a turning point or reunion.',
    'Changing circumstances can make old comparisons less useful. Separate what has actually changed from a story about luck or deservingness. No favorable cycle is implied; the reading simply asks which assumptions about resources deserve to be checked again.',
    'Choose a response small enough to revise. Adaptation does not require treating every disruption as an opportunity. You can acknowledge inconvenience and still identify the part of the situation where a deliberate choice remains available.',
    'Continuity and change coexist in this image. Some routines remain useful while their surroundings shift. Notice what you want to preserve by purpose rather than by habit, and what could change without losing that purpose.',
    'List one changed circumstance, one unchanged priority, and one modest adjustment that respects both.'
  ],
  [
    'Justice explores the work of making a judgment explainable. The skill is separating evidence, interpretation, and preference. You can practice fairness by stating what would change your mind, rather than treating confidence as proof that your conclusion is balanced.',
    'Fairness is not always identical treatment. Ask which expectations were actually agreed and which circumstances differ. Describe a disagreement without assigning motives you cannot verify, and leave room for accountability that does not become a verdict on someone’s worth.',
    'A transparent exchange makes obligations easier to examine. Read this symbol as a question about stated terms, hidden assumptions, and what each person believes is being offered. It is not legal advice or a claim that an agreement is fair.',
    'Review an ordinary choice using the information available at the time. Hindsight can clarify a lesson without making the past seem obvious. Responsibility becomes more useful when you name a specific action you could change.',
    'The theme is coherence between principles and exceptions. Ask whether you extend the same curiosity to yourself and others. A fair account can include context while still acknowledging consequences and obligations.',
    'Write two accounts of a minor disagreement. Underline the observations both accounts could accept, then identify one unanswered question.'
  ],
  [
    'The Hanged Man explores reframing. A useful skill is describing a problem without its usual assumption, so a different kind of solution becomes visible. Pausing can serve inquiry, but delay alone does not establish wisdom or make a sacrifice necessary.',
    'Perspective-taking does not require giving up your own account. Try describing what another person may be asking for, then check rather than assume. A pause in a conversation should create room for understanding, not leave someone indefinitely waiting for a response.',
    'The cost already paid can make a commitment feel compulsory. This symbol asks what you would choose if you encountered the situation for the first time today. It offers a reflection on attachment to past effort, not a recommendation to exit any financial arrangement.',
    'Change the question before increasing effort. If you keep asking how to make a plan work, try asking which part of its purpose still matters. A deliberate pause can have a boundary and a next step.',
    'Agency within limitation is the recurring theme. A situation may constrain some choices while leaving others available. This image invites careful distinction between accepting a fact and accepting a story that nothing can be reconsidered.',
    'Rewrite one stuck question from the perspective of a beginner. Identify a detail the original wording made you overlook.'
  ],
  [
    'Death symbolizes editing and release, never physical death. A skill to explore is recognizing when an element has served its purpose and removing it without dismissing its past value. Completion can be careful rather than dramatic.',
    'Old roles can continue after the agreement beneath them has changed. Ask which expectations need a new conversation and which can be respectfully retired. This symbol does not predict separation, bereavement, or any relationship outcome.',
    'An unused possession or old status marker can carry a story beyond its practical use. Ask what keeping it represents before deciding what to do. The reflection concerns meaning and attachment, not the future value of an asset.',
    'Name an ending precisely. Finishing a project, revising an opinion, and leaving an unused habit are different acts. Precision lets you acknowledge what mattered without claiming that everything in your life needs reinvention.',
    'The recurring theme is continuity through change. Releasing a form need not erase the learning it held. Notice what you want to carry forward as a value, even if its previous expression no longer fits.',
    'Choose one completed task and archive its materials deliberately. Write a sentence about what you are keeping from the experience.'
  ],
  [
    'Temperance explores the craft of adjustment. Bringing unlike elements together requires observing their proportions rather than declaring a permanent balance. Try noticing where a small change in sequence, timing, or intensity makes shared work easier.',
    'Compromise is useful when both people can name what matters. It is less useful when it hides a difference that needs direct discussion. This image invites a workable rhythm of speaking and listening without asking either person to disappear into the middle.',
    'Enough is a contextual word. An amount of convenience or comfort that fits one situation may not fit another. This archetype asks you to define sufficiency in ordinary language rather than treating either excess or deprivation as a moral identity.',
    'Make one adjustment and observe before making the next. Patient experimentation helps you see which change mattered. This is an invitation to examine a routine, not a prescription for health or a demand for a perfectly balanced life.',
    'Integration can preserve difference. A useful combination does not require every ingredient to become indistinguishable. Ask which parts of an experience belong together and which work better when they keep a clear boundary.',
    'Adjust one nonessential part of a routine for a day. Note the practical effect without scoring yourself as successful or unsuccessful.'
  ],
  [
    'The Devil explores candid attention to incentives. A skill to practice is noticing what makes an activity rewarding and what that reward leaves out. Desire is information to examine, not evidence of a bad character or a fixed limitation.',
    'Attachment can be discussed without turning another person into a possession. Ask where a request has become an expectation of access or reassurance. This symbol invites explicit consent and boundaries; it does not diagnose a person or a relationship.',
    'Status, convenience, and immediate pleasure are different reasons for wanting something. Name the appeal without condemning it, then notice any cost in attention or choice. No addiction, debt pattern, or financial outcome can be inferred from this symbol.',
    'Notice a cue before trying to change a habit. A repeated action may have a practical reward that deserves an alternative rather than a lecture. Keep the experiment small and avoid turning one automatic choice into a story about your whole identity.',
    'Freedom and desire are the conversation here. Having a preference is not the same as having no alternatives. Ask which commitments you choose willingly and which continue mainly because their rewards are familiar.',
    'Notice one low-stakes automatic choice. Write its cue, its immediate reward, and one other response you could try.'
  ],
  [
    'The Tower explores testing a foundation before defending its appearance. A skill to practice is inviting a useful objection early enough that a plan can change. Candor is more constructive when it identifies a repairable assumption rather than simply announcing that something is wrong.',
    'An ideal picture of harmony can make ordinary disagreement hard to admit. Ask what can be said honestly without predicting catastrophe. This archetype invites transparent conversation; it never forecasts betrayal, breakup, or disaster.',
    'An impressive presentation and a sound premise are different things. This symbol asks which resource assumptions you can actually explain. It supplies no warning about markets or loss; its purpose is to encourage a clearer account of what you know.',
    'Question one certainty without dismantling every source of stability. A modest revision can be enough when new information appears. Let the scale of your response follow the evidence rather than the drama associated with the image.',
    'The theme is honesty between structure and experience. A system may look coherent while failing its everyday purpose. Notice where acknowledging a small mismatch now would be more useful than maintaining a flawless description.',
    'Invite one practical objection to a small plan. Revise a single assumption and keep the parts that still serve their purpose.'
  ],
  [
    'The Star explores encouragement grounded in observable effort. A skill to practice is helping an unfinished idea remain possible without promising it will succeed. Specific appreciation can give someone more to work with than broad reassurance.',
    'Hope can make room for connection without writing another person’s future. Ask what support has actually been requested and what you can honestly offer. This image favors a present gesture of care over a promise that everything will turn out well.',
    'An aspiration can reveal a value even when its familiar symbols are expensive. Ask what part of the imagined future matters: time, expression, belonging, or freedom to explore. No prosperity is promised by this archetype.',
    'Make hope visible in a repeatable act. The act can be small enough to continue on an ordinary day and meaningful even without applause. Do not require yourself to feel inspired before deciding whether the practice is worthwhile.',
    'Possibility and evidence can coexist. You can be open to an idea while admitting how much remains unknown. Notice where encouragement supports effort and where reassurance has started to replace an honest conversation about limits.',
    'Record one effort you value for its own sake. Describe what you did concretely, without predicting where it will lead.'
  ],
  [
    'The Moon explores imagination alongside careful observation. A skill to practice is holding several explanations open when information is incomplete. Sensitivity to atmosphere can suggest questions, but the feeling of a story does not verify its details.',
    'Ambiguity can invite a story that neither person intended. Ask a direct, kind question before treating a silence or a tone as evidence of motive. This image supports checking understanding; it cannot reveal hidden feelings or secrets.',
    'A resource choice may be wrapped in an imagined story of relief or belonging. Separate the actual offer from the feeling you expect it to create. The symbol does not identify deception or validate a hunch about an opportunity.',
    'Give uncertainty a vocabulary. Distinguish what you observed, what you felt, and what you guessed. A useful next step may be gathering a small piece of information rather than trying to become certain through more speculation.',
    'The recurring theme is the relationship between imagination and knowledge. Stories can help express an experience without becoming literal explanations for it. Ask where a beautiful or frightening account needs a factual boundary.',
    'Describe an ambiguous ordinary event in three columns: observation, feeling, and possible explanation. Include at least two possible explanations.'
  ],
  [
    'The Sun explores open expression and shared enjoyment. A skill to practice is making enthusiasm accessible without requiring everyone to match it. Clear explanation and generous credit can bring warmth to work as well as celebration.',
    'Being seen can include being unfinished or quiet. Ask whether there is room in a connection for moods that are not bright. This symbol invites ordinary enjoyment together without assigning you the job of keeping everyone cheerful.',
    'Visible success and private enjoyment do not always ask for the same resources. Notice whether you would still value an experience if no one saw it. The question is about your definition of satisfaction, not a claim about future achievement.',
    'Let an enjoyable activity remain enjoyable without becoming a performance target. You may learn something by noticing what you return to freely. There is no requirement to turn every source of pleasure into a skill or productive habit.',
    'Visibility and generosity are the central conversation. Recognition can be shared without erasing individual effort. Ask where celebrating an ordinary contribution would feel more honest than waiting for a perfect result.',
    'Spend a short interval on something playful without recording or evaluating it. Afterward, name the part you enjoyed.'
  ],
  [
    'Judgment explores learning through review. A skill to practice is extracting a specific lesson without reducing an entire effort to success or failure. An honest account includes what you knew, what you missed, and what you would now do differently.',
    'Accountability becomes clearer when it names an action rather than a permanent identity. Ask what acknowledgment, repair, or changed agreement is actually being requested. This symbol does not grant forgiveness or predict reconciliation.',
    'Past resource choices can be reviewed without turning them into a verdict on your worth. Distinguish a lesson from regret that supplies no new information. This is reflective writing, not an assessment of your financial competence.',
    'Choose one lesson that can become an ordinary next action. A dramatic declaration of reinvention can obscure a useful small change. Let the review lead to something you can describe and later reconsider.',
    'The recurring theme is response after recognition. Seeing a familiar pattern does not require judging every earlier version of yourself. Ask what responsibility looks like now, with the information and choices presently available.',
    'Review one completed decision using three sentences: what I knew, what I learned, and what I would try next time.'
  ],
  [
    'The World explores integration and finishing. A skill to practice is helping separate contributions become a coherent whole while crediting their differences. Completion includes explaining what is finished and what has intentionally been left outside the scope.',
    'A connection can be meaningful without meeting every need. Ask what you appreciate in the relationship itself and what belongs to a wider circle of interests and support. Wholeness here is an image, not a promise of a perfect partnership.',
    'The definition of a finished goal can drift as soon as it is reached. Ask what would let you acknowledge enough before adding another requirement. This symbol concerns recognition and scope, not a prediction of wealth or material completion.',
    'Make room to recognize what has come together. Naming learning and limitations can give an ending shape without making it final in every sense. A project may be complete even while the skills it developed remain open to growth.',
    'Completion and connection are the conversation here. An ending can reveal how earlier fragments belong together. Notice which connection is supported by your actual experience and which would make a neater story than the facts allow.',
    'Mark one finished effort. Name its contribution, one limitation, and one lesson you want to carry into a different context.'
  ],
  [
    'The Fool explores the beginner’s willingness to ask an unpolished question. A skill to practice is entering an unfamiliar activity without pretending expertise. Openness works well with a clear boundary on effort, so curiosity does not become an unlimited commitment.',
    'Freshness in connection can begin with asking rather than assuming. Invite a shared experiment while leaving a comfortable way to decline. This symbol celebrates openness without treating spontaneity as proof of trust or a reason to ignore another person’s limits.',
    'Novelty can be appealing before its practical demands are visible. Ask what a small, bounded exploration would look like before making it a larger commitment. This is not encouragement to take financial risks or a claim that fortune favors a particular choice.',
    'Allow a first attempt to be a first attempt. You can learn something without turning it into a new identity. Decide what makes the experiment manageable and what would tell you it is time to stop or ask for help.',
    'Beginnings and responsibility can coexist. Not knowing everything is compatible with asking sensible questions. Notice when curiosity creates room for learning and when the wish to feel unconstrained overlooks an obligation that still matters.',
    'Try a small unfamiliar activity with a ten-minute limit. Write one question the experience raised rather than a judgment about your ability.'
  ],
];
export const premiumInterpretations: readonly PremiumArchetype[] = rows.map(([talent, relationships, money, growth, life, experiment]) => ({talent, relationships, money, growth, life, experiment}));
export function premiumInterpretation(number: number): PremiumArchetype {
  if (!Number.isInteger(number) || number < 1 || number > 22) throw new RangeError('Expected an arcana from 1 through 22.');
  return premiumInterpretations[number - 1];
}
