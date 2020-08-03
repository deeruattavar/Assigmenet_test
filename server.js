const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var AWS = require('aws-sdk');
app.use(bodyParser.json());
app.use(cors());
// Set the region 
AWS.config.update({region: 'us-east-1'});
// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});




app.get('/getSecurityGroup', async (req, res) => {
    var params = {
        GroupIds: ['SECURITY_GROUP_ID']
      };
      
      // Retrieve security group descriptions
      ec2.describeSecurityGroups(params, function(err, data) {
         if (err) {
            console.log("Error", err);
         } else {
            console.log("Success", JSON.stringify(data.SecurityGroups));
            var obj=JSON.stringify(data.SecurityGroups);
            for(i =0;i<data.length;i++){
              console.log(obj.SecurityGroups[i].GroupId)
              console.log(`INBOUND: ${obj.obj.SecurityGroups[i].IpPermissionsEgress[i].FromPort} ${obj.SecurityGroups[i].IpPermissionsEgress[i].IpProtocol[i].CidrIp}`)
                if(obj.SecurityGroups[i].IpPermissions[i].IpProtocol[i].CidrIp=='0.0.0.0/0'){
                  consolelog("INSECURE: YES")
                }else
                consolelog("INSECURE: NO")
            }
         }
      });
    
});



// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});