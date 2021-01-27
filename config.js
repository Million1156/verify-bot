module.exports = {
    token: '', //Your bot token
    embedColor: 'BLUE', //Color for embeds sent by your bot - [#hex / BLUE / RED / YELLOW / ...]
    botActivity: {
        activity: {
            name: 'New Members!', //Your bots activity name
            type: 'WATCHING' //Bots activity type - [LISTENING / PLAYING / STREAMING / WATCHING]
        },
        status: 'dnd' //Bots status - [online / dnd / idle / invisible]
    },
    verifiedLog: '',//Where to log when members verified and the questions they completed
    unverifiedRole: '', //Role to give to members that join, leave blank for none
    verifiedRole: '', //Role to give to members that complete verification, leave blank for none
    verificationFail: 'kick' //What to do if a member doesnt complete verification - [kick / ban]
}

module.exports.questions = [
    'How old are you?',
    'What is 2+2?',
    'Whens your birthday?',
    'Do you like us?' //You can add more questions if you'd like!
                      //Just put a comma and the question in 's,NOT ".
                      //For a guide,DM Million1156#0001.
]