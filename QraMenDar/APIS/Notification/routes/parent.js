var express = require("express");
var fetch = require("../shared/AppoloClient");
var router = express.Router();
const { Expo } = require("expo-server-sdk");
let expo = new Expo();

fetchData = async (idClassroomMatterTeacher = 1674, idElements = 156) => {
  let response = await fetch({
    query: `
    query MyQuery {
      classroom_teacher_matter(where: {id: {_eq: ${idClassroomMatterTeacher}}}) {
      teacher{
              first_name
              last_name
            }
            matter{
               name
          
            }
            classroom {
              level_sector{
                elements(where:{id:{_eq:${idElements}}}){
                  element_matter{
                    name
                  }
                }
              }
              registers {
                student {
                  id
                  first_name
                  last_name
                  father {
                    id
                    first_name
                    last_name
                    user{
                      id
                      connexion{
                        push_token
                        
                      }
                    }
                    
                  }
                }
              }
            }
      }
    }
    
  `,
  });

  return response.data.classroom_teacher_matter[0];
};

insertParentNotification = async (data) => {
  let response = await fetch({
    query: `
    mutation MyMutation($objects: [parentNotification_insert_input!]!) {
      insert_parentNotification(objects:$objects){
        affected_rows
      }
    }
    
  `,
    variables: {
      objects: data,
    },
  });

  console.log(response);
  return response.data.insert_parentNotification[0];
};

pushNotification = (ArrayData) => {
  let messages = [];
  ArrayData.map((e) => {
    try {
      if (!Expo.isExpoPushToken(e.pushToken)) {
        console.error(
          `Push token ${e.pushToken} is not a valid Expo push token`
        );
        throw "not valid";
      }
      messages.push({
        to: e.pushToken,
        sound: "default",
        body: `Cours : ${e.content.student_name}`,
        data: content,
      });
    } catch (e) {}
  });
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

router.post("/parentNotification", async function (req, res, next) {
  //var payload = req.body.event.data.new;
  let data = await this.fetchData(
    payload.id_classroom_teacher_matter,
    payload.id_element
  );

  let pushTokens = [];
  data.classroom.registers.map(async (e) => {
    await insertParentNotification({
      id_parent: e.student.father.id,
      student_id: e.student.id,
      content: {
        student_name: `${e.student.first_name} ${e.student.last_name}`,
        matter: data.classroom.name,
        element: data.classroom.level_sector.elements[0].element_matter.name,
        teacher_name: `${data.teacher.first_name} ${data.teacher.last_name}`,
        cours: payload.name,
      },
    });
    try {
      pushTokens.push({
        pushToken: e.user.connexion.push_token,
        content: {
          student_name: `${e.student.first_name} ${e.student.last_name}`,
          matter: data.classroom.name,
          element: data.classroom.level_sector.elements[0].element_matter.name,
          teacher_name: `${data.teacher.first_name} ${data.teacher.last_name}`,
          cours: payload.name,
        },
      });
    } catch (e) {}
  });
  pushNotification(pushTokens);

  res.send("Push Send it");
});

module.exports = router;
