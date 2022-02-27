const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
let writeStream;


const csvWriter = createCsvWriter({
    path: './followers.csv',
    header: [
        {id: 'screen_name', title: "Handle"},
        {id: 'url', 'title': "URL"},
        {id: 'verified', title: 'Verified'},
        {id: 'following', title: 'Following'},
        {id: 'followers_count', title: 'Followers'}
    ],
    append: true
});
(async () => {
    try{
        let url = 'https://twitter.com/i/api/graphql/BZBTUydTWeNgTvoGqQ6BNw/Following?variables=';
       // let variables = '%7B%22userId%22%3A%2263796828%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text_enabled%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D';
        let variables =  '%7B%22userId%22%3A%2263796828%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text_enabled%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22cursor%22%3A%221725633175207956374%7C1497847949751746100%22%7D';
        let next =  true;

        let records = 0;

        while(next){


            
            console.log('URL', url+variables );
            writeStream = fs.createWriteStream('./urls.log', {'flags': 'a'});
            writeStream.write(url+variables + "\n");
            // the finish event is emitted when all data has been flushed from the stream
            writeStream.on('finish', () => {
                //console.log('wrote all data to file');
            });
            // close the stream
            writeStream.end();
            await waitAndRetry(1000);


        //variables  = '%7B%22userId%22%3A%2263796828%22%2C%22count%22%3A200%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text_enabled%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D';
        //console.log(decodeURIComponent(variables));
       // const res = await axios.get("https://twitter.com/i/api/graphql/j83y0Zli5ekZqQUMDdhV3w/Followers?variables=%7B%22userId%22%3A%2263796828%22%2C%22count%22%3A200%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text_enabled%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D", {
            const res = await axios.get(url + variables , {
            headers: {
                "accept": "*/*",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                "content-type": "application/json",
                "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": "18148a5822b4d1646de4616034b6780d539ff6a2291ed4e1d3cfa8eaf6fe191bfc658cf06f0fd08683b92f1c51958aba8c2102956643575e75606bf5206f454b64fd5af2bab744bedce9b7f54981b25d",
                "x-twitter-active-user": "yes",
                "x-twitter-auth-type": "OAuth2Session",
                "x-twitter-client-language": "en",
                "cookie": "personalization_id=\"v1_Bg5J4MgCkCyOx6ySxaQpEg==\"; guest_id_marketing=v1%3A163985273020499057; guest_id_ads=v1%3A163985273020499057; guest_id=v1%3A163985273020499057; g_state={\"i_p\":1643886700271,\"i_l\":1}; kdt=WgLC0lvncOpIg2DZauXF0y6KPQbzjolR3TL5WRL2; auth_token=e8e12a4025737ea9f033c086be26f5b6ca16065b; ct0=18148a5822b4d1646de4616034b6780d539ff6a2291ed4e1d3cfa8eaf6fe191bfc658cf06f0fd08683b92f1c51958aba8c2102956643575e75606bf5206f454b64fd5af2bab744bedce9b7f54981b25d; twid=u%3D1375062056777342977; _gid=GA1.2.1471899224.1645870774; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; des_opt_in=Y; _gcl_au=1.1.2082338786.1645897793; mbox=session#7b56b44b8ede49f280e84fac0e7fed43#1645902003|PC#7b56b44b8ede49f280e84fac0e7fed43.31_0#1709144943; _ga_34PHSZMC42=GS1.1.1645897789.1.1.1645900142.0; _ga=GA1.2.1129466556.1643879497"
            
              },
              "referrer": "https://twitter.com/verified/following",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": null,
              "method": "GET",
              "mode": "cors"
          });
 

         //console.log('RESULT', res.data.data.user.result.timeline.timeline.instructions[2]['entries'][0]['content']['itemContent']['user_results']['result']['legacy']['followers_count']);
         //console.log('RESULT', res.data.data.user.result.timeline.timeline.instructions[0]['entries']);
        // console.log("INST", res.data.data.user.result.timeline.timeline.instructions);
        for(k in res.data.data.user.result.timeline.timeline.instructions){
            console.log('KEY', k);
            if(res.data.data.user.result.timeline.timeline.instructions[k]['type'] == 'TimelineAddEntries' ){
                records = res.data.data.user.result.timeline.timeline.instructions[k]['entries'];
                //console.log(records);
            }
        }
       /*   if(res.data.data.user.result.timeline.timeline.instructions[2]['entries']){
            records = res.data.data.user.result.timeline.timeline.instructions[2]['entries'];
         }else if(res.data.data.user.result.timeline.timeline.instructions[0]['entries']){
            records = res.data.data.user.result.timeline.timeline.instructions[0]['entries'];
         }else{
             console.log("INST", res.data.data.user.result.timeline.timeline.instructions);
         } */
       // const records = res.data.data.user.result.timeline.timeline.instructions[2]['entries'];
        //console.log(records[0]['content']['itemContent']['user_results']['result']['legacy']);
        console.log('LEN', records.length);
        let csvRecords = [];

        for(let i = 0 ; i < records.length; i++){
            if( "itemContent" in  records[i]['content']){
                //console.log(i, records[i]['content']['itemContent']['user_results']['result']);
                //console.log(records[i]['content']['itemContent']['user_results']['result']['legacy']);
                // let desc =    records[i]['content']['itemContent']['user_results']['result']['legacy']['description'];
                if( "legacy" in records[i]['content']['itemContent']['user_results']['result']){
                    let followers_count = records[i]['content']['itemContent']['user_results']['result']['legacy']['followers_count'];
                    let friends_count = records[i]['content']['itemContent']['user_results']['result']['legacy']['friends_count'];
                    // let normal_followers_count = records[i]['content']['itemContent']['user_results']['result']['legacy']['normal_followers_count'];
                    let screen_name = records[i]['content']['itemContent']['user_results']['result']['legacy']['screen_name'];
                    let verified = records[i]['content']['itemContent']['user_results']['result']['legacy']['verified'];
                    csvRecords.push( {screen_name: screen_name,  
                    url: 'https://twitter.com/' + screen_name,
                    verified:verified,
                    following:friends_count,
                    followers_count:followers_count
                    });
                }
            }else{
                if(records[i]['content']['entryType'] == 'TimelineTimelineCursor' && 
                records[i]['content']['cursorType'] == 'Bottom' ){
                    if(records[i]['content']['value']){

                        let obj = JSON.parse(decodeURIComponent(variables));
                        obj.cursor = records[i]['content']['value'];
                        //console.log(obj.count);
                        obj = JSON.stringify(obj);
                        variables = encodeURIComponent(obj);
                        console.log(decodeURIComponent(variables) + "\n");
                        break;
                    
                    }else{              
                         console.log('matchbottom else');
                       next = false;
                       break;
                    }
                }/*else{
                    console.log('OUTSIDE');
                    next = false;
                }*/
            }
        }//end for
        await csvWriter.writeRecords(csvRecords);
    }//while

 }catch(e){
    console.log('error', e.stack);
}
})();

async function waitAndRetry(secWait){
	console.log('waitAndRetry', secWait);
	return new Promise((res) => setTimeout(res, secWait));
}







//#https://twitter.com/i/api/graphql/BZBTUydTWeNgTvoGqQ6BNw/Following?variables={"userId":"63796828","count":20,"cursor":"1725833141345727054|1497639881894002646","includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"__fs_dont_mention_me_view_api_enabled":false,"__fs_interactive_text_enabled":false,"__fs_responsive_web_uc_gql_enabled":false}
//#https://twitter.com/i/api/graphql/BZBTUydTWeNgTvoGqQ6BNw/Following?variables={"userId":"63796828","count":20,"cursor":"1725825475025696109|1497639881894002624","includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"__fs_dont_mention_me_view_api_enabled":false,"__fs_interactive_text_enabled":false,"__fs_responsive_web_uc_gql_enabled":false}
//https://twitter.com/i/api/graphql/BZBTUydTWeNgTvoGqQ6BNw/Following?variables={"userId":"63796828","count":20,"includePromotedContent":false,"withSuperFollowsUserFields":true,"withDownvotePerspective":false,"withReactionsMetadata":false,"withReactionsPerspective":false,"withSuperFollowsTweetFields":true,"__fs_dont_mention_me_view_api_enabled":false,"__fs_interactive_text_enabled":false,"__fs_responsive_web_uc_gql_enabled":false}
// require
//     curl  
//    -H "authorization: Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"




//  -H "cookie: personalization_id="v1_Bg5J4MgCkCyOx6ySxaQpEg=="; guest_id_marketing=v1%3A163985273020499057; guest_id_ads=v1%3A163985273020499057; guest_id=v1%3A163985273020499057; g_state={"i_p":1643886700271,"i_l":1}; kdt=WgLC0lvncOpIg2DZauXF0y6KPQbzjolR3TL5WRL2; auth_token=e8e12a4025737ea9f033c086be26f5b6ca16065b; ct0=18148a5822b4d1646de4616034b6780d539ff6a2291ed4e1d3cfa8eaf6fe191bfc658cf06f0fd08683b92f1c51958aba8c2102956643575e75606bf5206f454b64fd5af2bab744bedce9b7f54981b25d; twid=u%3D1375062056777342977; _gid=GA1.2.1471899224.1645870774; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; at_check=true; lang=en; des_opt_in=Y; _gcl_au=1.1.2082338786.1645897793; mbox=session#7b56b44b8ede49f280e84fac0e7fed43#1645899913|PC#7b56b44b8ede49f280e84fac0e7fed43.31_0#1709142853; _ga=GA1.2.1129466556.1643879497; _ga_34PHSZMC42=GS1.1.1645897789.1.1.1645898113.0"
//  -H "referer: https://twitter.com/verified/following"
//  -H "sec-ch-ua-mobile: ?0"
//  -H "sec-fetch-dest: empty"
//   -H "sec-fetch-mode: cors"
//  -H "sec-fetch-site: same-origin"
//  -H "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
//   -H "x-csrf-token: 18148a5822b4d1646de4616034b6780d539ff6a2291ed4e1d3cfa8eaf6fe191bfc658cf06f0fd08683b92f1c51958aba8c2102956643575e75606bf5206f454b64fd5af2bab744bedce9b7f54981b25d"
//  -H "x-twitter-active-user: yes"
//  -H "x-twitter-auth-type: OAuth2Session"
//   -H "x-twitter-client-language: en"


//     -X GET  https://twitter.com/i/api/graphql/BZBTUydTWeNgTvoGqQ6BNw/Following?variables=%7B%22userId%22%3A%2263796828%22%2C%22count%22%3A20%2C%22cursor%22%3A%221725809117382998837%7C1497631476315848596%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text_enabled%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D


