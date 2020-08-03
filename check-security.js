var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  DryRun: false
};

// Call EC2 to retrieve policy for selected bucket
ec2.describeInstances(params, function(err, data) {
  if (err) {
    console.log("Error", err.stack);
  } else {
    console.log("Success", JSON.stringify(data));
  }
});



var params = {
    GroupIds: ['SECURITY_GROUP_ID']
  };
  
  // Retrieve security group descriptions
  var ip =[];
  ec2.describeSecurityGroups(params, function(err, data) {
     if (err) {
        console.log("Error", err);
     } else {
        console.log("Success", JSON.stringify(data));
        var obj=JSON.stringify(data);
        for(i =0;i<obj.length;i++){
          console.log(obj.SecurityGroups[0].GroupId)
          console.log(`INBOUND: ${obj.obj.SecurityGroups[0].IpPermissionsEgress[i].FromPort} ${obj.SecurityGroups[0].IpPermissionsEgress[i].IpProtocol[i].CidrIp}`)
            if(obj.SecurityGroups[0].IpPermissions[i].IpProtocol[i].CidrIp=='0.0.0.0/0'){
              consolelog("INSECURE: YES")
            }else
            consolelog("INSECURE: NO")
        }
     }
  });
