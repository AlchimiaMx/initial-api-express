function createCodeBlock (title, code, isError = false) {
  if (!code || ( Object.keys(code).length === 0 && !isError ) ) return ''
  code = (typeof code === 'string') ? code.trim() : JSON.stringify(code, null, 2)
  const tripleBackticks = '```'
  return `\n_${title}_${tripleBackticks}${code}${tripleBackticks}\n`
}

module.exports = {
  token: 'xoxb-397816778853-432677637990-nmGP3VuOT2ZZBClFvaU1eXY5',
  conversationId: 'CCG87QV3P',
  active: process.env.SLACK_ACTIVE || false,
  formatRouter: (req, err) => {
    return [
      {
        fallback: `${ err.name }: ${ err.details ? err.details[0].message : err.message }`,
        title: `${ err.name }: ${ err.details ? err.details[0].message : err.message }`,
        color: 'danger',
        author_name: req.hostname,
        fields: [
          { title: 'User', value: req.user? req.user.email : ' - ' },
          { title: 'Request', value: `[${ req.method }]  ${ req.url }` }
        ],
        footer: 'Petri-Express @Alchimia',
        ts: parseInt(Date.now() / 1000),
        mrkdwn_in: ['text'],
        text: [
          createCodeBlock(  'Error', err.annotate ?  err.annotate() : err.stack , true ),
          createCodeBlock(  'REQ.BODY', req.body ),
          createCodeBlock(  'REQ.QUERY', req.query ),
          createCodeBlock(  'REQ.PARAMS', req.params ),
        ].join('')
      }
    ]
  }
}
