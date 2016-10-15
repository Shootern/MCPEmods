var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var level = 1;
var exp = 0;
var maxExp = 1000;
var availablePoints = 0;
var levelText = new android.widget.TextView(ctx);
var expText = new android.widget.TextView(ctx);
var menuui;
var menuui2;
var menuui3;
var menuui4;
var configGUI;
var regenMax = 30;
var regenerationSkill = 0;
var regencount = 0;
var regenTicks = 420;//20seconds
var strengthMax = 10;
var strengthSkill = 0;
var strengthChance = 10;
var desperateMax = 1;
var desperateSkill = 0;
var healSkill = 0;
var healMax = 10;
var healCooldown = 600;
var healUsable = true;
var healCount = 0;
var healHearts = 1;
var bashMax = 10;
var bashSkill = 0;
var bashDamage = 10;
var bashCount = 0;
var bashCooldown = 600;
var bashUsable = true;
var selectingTarget = false;
var selectingTargetCo = "NaN";
var innerPeaceSkill = 0;
var innerPeaceHearts = 0;
var innerPeaceMax = 10;
var iphe = 20;
var inWorld = false;
var autoSaveCount = 0;
var autoSaveMax = 700;

var hotkeyGUI;
var width = 60;
var height = 50;
var hotkey1 = "NaN";
var hotkey2 = "NaN";
var hotkey3 = "NaN";
var hotkey4 = "NaN";
var hotkey5 = "NaN";
var hotkey6 = "NaN";

function Config(){
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try {

				var menu = new android.widget.LinearLayout(ctx);
				var scrollview = new android.widget.ScrollView(ctx);
				var menuLayout = new android.widget.LinearLayout(ctx);
				//var key = java.util.Keyboard.getInstance();

				configGUI = new android.widget.PopupWindow(menuLayout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight());

				menu.setOrientation(1);
				menuLayout.setOrientation(1);
				var title = new android.widget.TextView(ctx);
				var if1 = new android.widget.TextView(ctx);
				var if2 = new android.widget.TextView(ctx);
				var if3 = new android.widget.TextView(ctx);
				var if4 = new android.widget.TextView(ctx);
 
menu.addView(title);
title.setTextSize(30);
title.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
title.setText("Configuration\n");
menu.addView(if1);
if1.setTextSize(20);
if1.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
if1.setText("Hotkey Button Width : "+width);
				var lvl = new android.widget.SeekBar(ctx);
				lvl.setMax(100);
				lvl.setProgress(width);
				lvl.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener()
				{
					onProgressChanged: function()
				{
if1.setText("Hotkey Button Width : "+lvl.getProgress());
						width = lvl.getProgress();
					},
					onStopTrackingTouch: function()
					{
if1.setText("Hotkey Button Width : "+lvl.getProgress());
						width = lvl.getProgress();
					}
				});
				menu.addView(lvl);

menu.addView(if2);
if2.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
if2.setTextSize(20);
if2.setText("\nHotkey Button Height : "+height);
				var h = new android.widget.SeekBar(ctx);
				h.setMax(100);
				h.setProgress(height);
				h.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener()
				{
					onProgressChanged: function()
					{
if2.setText("\nHotkey Button Height : "+h.getProgress());
						height = h.getProgress();
					},
					onStopTrackingTouch: function()
					{
if2.setText("\nHotkey Button Height : "+h.getProgress());
						height = h.getProgress();

					}
				});
				menu.addView(h);

				var Done = new android.widget.Button(ctx);
				Done.setText("Done");
				Done.setTextSize(15);

				Done.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(viewarg) {
							configGUI.dismiss();
                        hotkeyGUI.dismiss();
                        hotKey();
						}
				}));
				menu.addView(Done);

                scrollview.addView(menu);
				menuLayout.addView(scrollview);

               configGUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE));
 

				configGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);

				configGUI.setTouchable(true);

			} catch (error) {
				print("Error: " + error);
			}
		}
	}));
}

function changehotkeyText(hotk){
var co;
var done = false;

if(hotk == "HealSkill" && done == false){
co = "Heal";
return co
done = true;
}
if(hotk == "BashSkill" && done == false){
co = "Bash";
return co
done = true;
}
}

function hotKey(){
var t = 20;
	ctx.runOnUiThread(new java.lang.Runnable() {
 		run: function() {

 			try {
 			
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(android.widget.LinearLayout.VERTICAL);

		hotkeyGUI = new android.widget.PopupWindow(layout, -2, -2);
        var menu = layout;
		
		//hotkeyGUI = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()-2 / 4, ctx.getWindowManager().getDefaultDisplay().getHeight());

		hotkeyGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.CENTER, 0, -120);
        var paramsImageView = new android.widget.LinearLayout.LayoutParams(width,height);
//40:30

    if(hotkey1 !== "NaN"){
    var button1 = new android.widget.Button(ctx);
    var recallText = changehotkeyText(hotkey1);
    button1.setText(""+recallText);
    button1.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
    button1.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(hotkey1=="HealSkill" && healUsable == true){
       healUsable = false;
       if(Entity.getHealth(getPlayerEnt()) <= 19)
       Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+healHearts);
      } else if(healUsable == false && hotkey1=="HealSkill"){
      clientMessage("This Skill is still in Cooldown wait at least "+healCooldown/t+" seconds before you could use this skill again");
     }
    if(hotkey1=="BashSkill" && bashUsable == true &&selectingTarget == false){
    selectingTarget = true;
    selectingTargetCo = "Bash";
    showHitMessage();
  } else if(hotkey1=="BashSkill" && bashUsable == false){
     clientMessage("This Skill is still in Cooldown wait at least "+bashCooldown/t+" seconds before you could use this skill again");       
        }
     }
    }));
    menu.addView(button1);
    button1.setLayoutParams(paramsImageView);
   }

  if(hotkey2 !== "NaN"){
    var button2 = new android.widget.Button(ctx);
    recallText = changehotkeyText(hotkey2);
    button2.setText(""+recallText);
 
  button2.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
    button2.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(hotkey2=="HealSkill" && healUsable == true){
       healUsable = false;
       if(Entity.getHealth(getPlayerEnt()) <= 19)
       Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+healHearts);
      } else if(healUsable == false && hotkey2=="HealSkill"){
      clientMessage("This Skill is still in Cooldown wait at least "+healCooldown/t+" seconds before you could use this skill again");
         }
    if(hotkey2=="BashSkill" && bashUsable == true &&selectingTarget == false){
    selectingTarget = true;
    selectingTargetCo = "Bash";
    showHitMessage();
  } else if(hotkey2=="BashSkill" && bashUsable == false){
     clientMessage("This Skill is still in Cooldown wait at least "+bashCooldown/t+" seconds before you could use this skill again");
       
}
       
     }
    }));
    menu.addView(button2);
    button2.setLayoutParams(paramsImageView);
   }

   if(hotkey3 !== "NaN"){
    var button3 = new android.widget.Button(ctx);
    recallText = changehotkeyText(hotkey3);
    button3.setText(""+recallText);
    button3.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
    button3.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(hotkey3=="HealSkill" && healUsable == true){
       healUsable = false;
       if(Entity.getHealth(getPlayerEnt()) <= 19)
       Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+healHearts);
      } else if(healUsable == false && hotkey3=="HealSkill"){
      clientMessage("This Skill is still in Cooldown wait at least "+healCooldown/t+" seconds before you could use this skill again");
         }
    if(hotkey3=="BashSkill" && bashUsable == true &&selectingTarget == false){
    selectingTarget = true;
    selectingTargetCo = "Bash";
    showHitMessage();
  } else if(hotkey3=="BashSkill" && bashUsable == false){
     clientMessage("This Skill is still in Cooldown wait at least "+bashCooldown/t+" seconds before you could use this skill again");
       
}
       
     }
    }));
    menu.addView(button3);
    button3.setLayoutParams(paramsImageView);
   }

if(hotkey4 !== "NaN"){
    var button4 = new android.widget.Button(ctx);
    recallText = changehotkeyText(hotkey4);
    button4.setText(""+recallText);
    button4.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
    button4.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(hotkey4=="HealSkill" && healUsable == true){
       healUsable = false;
       if(Entity.getHealth(getPlayerEnt()) <= 19)
       Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+healHearts);
      } else if(healUsable == false && hotkey4=="HealSkill"){
      clientMessage("This Skill is still in Cooldown wait at least "+healCooldown/t+" seconds before you could use this skill again");
         }
    if(hotkey4=="BashSkill" && bashUsable == true &&selectingTarget == false){
    selectingTarget = true;
    selectingTargetCo = "Bash";
    showHitMessage();
  } else if(hotkey4=="BashSkill" && bashUsable == false){
     clientMessage("This Skill is still in Cooldown wait at least "+bashCooldown/t+" seconds before you could use this skill again");
       
}
       
     }
    }));
    menu.addView(button4);
    button4.setLayoutParams(paramsImageView);
   }

if(hotkey5 !== "NaN"){
    var button5 = new android.widget.Button(ctx);
    recallText = changehotkeyText(hotkey5);
    button5.setText(""+recallText);
    button5.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
    button5.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(hotkey5=="HealSkill" && healUsable == true){
       healUsable = false;
       if(Entity.getHealth(getPlayerEnt()) <= 19)
       Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+healHearts);
      } else if(healUsable == false && hotkey5=="HealSkill"){
      clientMessage("This Skill is still in Cooldown wait at least "+healCooldown/t+" seconds before you could use this skill again");
         }
    if(hotkey5=="BashSkill" && bashUsable == true &&selectingTarget == false){
    selectingTarget = true;
    selectingTargetCo = "Bash";
    showHitMessage();
  } else if(hotkey5=="BashSkill" && bashUsable == false){
     clientMessage("This Skill is still in Cooldown wait at least "+bashCooldown/t+" seconds before you could use this skill again");
       
}
       
     }
    }));
    menu.addView(button5);
    button5.setLayoutParams(paramsImageView);
   }

   if(hotkey6 !== "NaN"){
    var button6 = new android.widget.Button(ctx);
    recallText = changehotkeyText(hotkey6);
    button6.setText(""+recallText);
    button6.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
    button6.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(hotkey6=="HealSkill" && healUsable == true){
       healUsable = false;
       if(Entity.getHealth(getPlayerEnt()) <= 19)
       Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+healHearts);
      } else if(healUsable == false && hotkey6=="HealSkill"){
      clientMessage("This Skill is still in Cooldown wait at least "+healCooldown/t+" seconds before you could use this skill again");
         }
    if(hotkey6=="BashSkill" && bashUsable == true &&selectingTarget == false){
    selectingTarget = true;
    selectingTargetCo = "Bash";
    showHitMessage();
  } else if(hotkey6=="BashSkill" && bashUsable == false){
     clientMessage("This Skill is still in Cooldown wait at least "+bashCooldown/t+" seconds before you could use this skill again");
       
}
       
     }
    }));
    menu.addView(button6);
    button6.setLayoutParams(paramsImageView);
   }

			} catch (e) {
 				SaveThisAs("Error: "+e,"ErrorCode");
 			}

 		}
 	});
 }

function menu3(ahotkey) {
 ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {

    var menu = new android.widget.LinearLayout(ctx);
    var scrollview = new android.widget.ScrollView(ctx);
    var menuLayout = new android.widget.LinearLayout(ctx);
    var creator = new android.widget.TextView(ctx);
    var creator2 = new android.widget.TextView(ctx);
    var creator3 = new android.widget.TextView(ctx);
    var creator4 = new android.widget.TextView(ctx);
    var creator5 = new android.widget.TextView(ctx);
    var creator6 = new android.widget.TextView(ctx);
    var spacer = new android.widget.TextView(ctx);
   creator.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator2.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator3.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator4.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator5.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator6.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD")); 

    menu.setOrientation(1);
    menuLayout.setOrientation(1);

    scrollview.addView(menu);
    menuLayout.addView(scrollview);

var st = new android.widget.TextView(ctx);

   menu.addView(st);
    st.setTextSize(25);
    st.setText("Assign Hotkey for this Skill\n");

    menu.addView(creator);
    creator.setTextSize(15);
    if(hotkey1=="NaN")
    creator.setText("Assigned Skill : None");
    if(hotkey1=="HealSkill")
    creator.setText("Assigned Skill : Heal Skill");
    if(hotkey1=="BashSkill")
    creator.setText("Assigned Skill : Bash Skill");
    var button1 = new android.widget.Button(ctx);
    button1.setText("Assign");
    button1.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       hotkey1 = ""+ahotkey;
       menuui3.dismiss();
       hotkeyGUI.dismiss();
       hotKey();
       print("Assigned");
     }
    }));
    menu.addView(button1);

if(hotkey1 !== "NaN"){
var button7 = new android.widget.Button(ctx);
    button7.setText("Clear HotKey");
    button7.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       
hotkey1 = "NaN";
      
 menuui3.dismiss();
        hotkeyGUI.dismiss();
        hotKey();
        print("Cleared Hotkey");
     }
    }));
    menu.addView(button7);
}

menu.addView(creator2);
    creator2.setTextSize(15);
    if(hotkey2=="NaN")
    creator2.setText("Assigned Skill : None");
    if(hotkey2=="HealSkill")
    creator2.setText("Assigned Skill : Heal Skill");
    if(hotkey2=="BashSkill")
    creator2.setText("Assigned Skill : Bash Skill");
    var button2 = new android.widget.Button(ctx);
    button2.setText("Assign");
    button2.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       hotkey2 = ""+ahotkey;
       menuui3.dismiss();
       hotkeyGUI.dismiss();
       hotKey();
       print("Assigned");
     }
    }));
    menu.addView(button2);

if(hotkey2 !== "NaN"){
var button8 = new android.widget.Button(ctx);
    button8.setText("Clear HotKey");
    button8.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       
hotkey2 = "NaN";
      
 menuui3.dismiss();
        hotkeyGUI.dismiss();
        hotKey();
        print("Cleared Hotkey");
     }
    }));
    menu.addView(button8);
}

menu.addView(creator3);
    creator3.setTextSize(15);
    if(hotkey3=="NaN")
    creator3.setText("Assigned Skill : None");
    if(hotkey3=="HealSkill")
    creator3.setText("Assigned Skill : Heal Skill");
    if(hotkey3=="BashSkill")
    creator3.setText("Assigned Skill : Bash Skill");
    var button3 = new android.widget.Button(ctx);
    button3.setText("Assign");
    button3.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       hotkey3 = ""+ahotkey;
       menuui3.dismiss();
       hotkeyGUI.dismiss();
       hotKey();
       print("Assigned");
     }
    }));
    menu.addView(button3);

if(hotkey3 !== "NaN"){
var button9 = new android.widget.Button(ctx);
    button9.setText("Clear HotKey");
    button9.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {       
        hotkey3 = "NaN";     
        menuui3.dismiss();
        hotkeyGUI.dismiss();
        hotKey();
        print("Cleared Hotkey");
     }
    }));
    menu.addView(button9);
}

menu.addView(creator4);
    creator4.setTextSize(15);
    if(hotkey4=="NaN")
    creator4.setText("Assigned Skill : None");
    if(hotkey4=="HealSkill")
    creator4.setText("Assigned Skill : Heal Skill");
    if(hotkey4=="BashSkill")
    creator4.setText("Assigned Skill : Bash Skill");
    var button4 = new android.widget.Button(ctx);
    button4.setText("Assign");
    button4.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       hotkey4 = ""+ahotkey;
       menuui3.dismiss();
       hotkeyGUI.dismiss();
       hotKey();
       print("Assigned");
     }
    }));
    menu.addView(button4);

if(hotkey4 !== "NaN"){
var button10 = new android.widget.Button(ctx);
    button10.setText("Clear HotKey");
    button10.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {       
        hotkey4 = "NaN";     
        menuui3.dismiss();
        hotkeyGUI.dismiss();
        hotKey();
        print("Cleared Hotkey");
     }
    }));
    menu.addView(button10);
}

menu.addView(creator5);
    creator5.setTextSize(15);
    if(hotkey5=="NaN")
    creator5.setText("Assigned Skill : None");
    if(hotkey5=="HealSkill")
    creator5.setText("Assigned Skill : Heal Skill");
    if(hotkey5=="BashSkill")
    creator5.setText("Assigned Skill : Bash Skill");
    var button5 = new android.widget.Button(ctx);
    button5.setText("Assign");
    button5.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       hotkey5 = ""+ahotkey;
       menuui3.dismiss();
       hotkeyGUI.dismiss();
       hotKey();
       print("Assigned");
     }
    }));
    menu.addView(button5);

if(hotkey5 !== "NaN"){
var button11 = new android.widget.Button(ctx);
    button11.setText("Clear HotKey");
    button11.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {       
        hotkey5 = "NaN";     
        menuui3.dismiss();
        hotkeyGUI.dismiss();
        hotKey();
        print("Cleared Hotkey");
     }
    }));
    menu.addView(button11);
}

menu.addView(creator6);
    creator6.setTextSize(15);
    if(hotkey6=="NaN")
    creator6.setText("Assigned Skill : None");
    if(hotkey6=="HealSkill")
    creator6.setText("Assigned Skill : Heal Skill");
    if(hotkey6=="BashSkill")
    creator6.setText("Assigned Skill : Bash Skill");
    var button6 = new android.widget.Button(ctx);
    button6.setText("Assign");
    button6.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       hotkey6 = ""+ahotkey;
       menuui3.dismiss();
       hotkeyGUI.dismiss();
       hotKey();
       print("Assigned");
     }
    }));
    menu.addView(button6);

if(hotkey6 !== "NaN"){
var button12 = new android.widget.Button(ctx);
    button12.setText("Clear HotKey");
    button12.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {     
         hotkey6 = "NaN";
         menuui3.dismiss();
        hotkeyGUI.dismiss();
        hotKey();
        print("Cleared Hotkey");
     }
    }));
    menu.addView(button12);
}
    menu.addView(spacer);

 var button13 = new android.widget.Button(ctx);
    button13.setText("Cancel");
    button13.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {     
        menuui3.dismiss();
        hotkeyGUI.dismiss();
        hotKey();
     }
    }));
    menu.addView(button13);

    menuui3 = new android.widget.PopupWindow(menuLayout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight());

    menuui3.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE));

    menuui3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, 0, 0);

   } catch (error) {
    print("Error: " + error);
   }
  }
 }));
}

function SaveThisAs(input,filename){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/SkillsResources/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,filename+".txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(input.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function LoadThisData(filename){
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/SkillsResources/"+Level.getWorldName()+"/";
if(java.io.File(path+filename+".txt").exists()){
var file=new java.io.File(path+filename+".txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
var unloader = parseInt(str.toString());
return unloader;
fos.close();

}
}
  
function Save(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/SkillsResources/"+Level.getWorldName()+"/";
if(!java.io.File(path+"Level.txt").exists()){
SaveThisAs(level,"Level");
}
if(!java.io.File(path+"exp.txt").exists()){
SaveThisAs(exp,"exp");
}
if(!java.io.File(path+"maxExp.txt").exists()){
SaveThisAs(maxExp,"maxExp");
}
if(!java.io.File(path+"availablePoints.txt").exists()){
SaveThisAs(availablePoints,"availablePoints");
}
if(!java.io.File(path+"battleHealing.txt").exists()){
SaveThisAs(regenerationSkill,"battleHealing");
}
if(!java.io.File(path+"regenTicks.txt").exists()){
SaveThisAs(regenTicks,"regenTicks");
}
if(!java.io.File(path+"Saved?.txt").exists()){
SaveThisAs("True","Saved?");
}
if(!java.io.File(path+"strengthSkill.txt").exists()){
SaveThisAs(strengthSkill,"StrengthSkill");
}
if(!java.io.File(path+"strengthChance.txt").exists()){
SaveThisAs(strengthChance,"StrengthChance");
}
if(!java.io.File(path+"desperateSkill.txt").exists()){
SaveThisAs(desperateSkill,"desperateSkill");
}
if(!java.io.File(path+"healSkill.txt").exists()){
SaveThisAs(healSkill,"healSkill");
}
if(!java.io.File(path+"healCooldown.txt").exists()){
SaveThisAs(healCooldown,"healCooldown");
}
if(!java.io.File(path+"bashSkill.txt").exists()){
SaveThisAs(bashSkill,"bashSkill");
}
if(!java.io.File(path+"bashDamage.txt").exists()){
SaveThisAs(bashDamage,"bashDamage");
}
if(!java.io.File(path+"innerPeaceSkill.txt").exists()){
SaveThisAs(innerPeaceSkill,"innerPeaceSkill");
}
if(!java.io.File(path+"innerPeaceHearts.txt").exists()){
SaveThisAs(innerPeaceHearts,"innerPeaceHearts");
}
if(!java.io.File(path+"iphe.txt").exists()){
SaveThisAs(iphe,"iphe");
}
if(java.io.File(path+"Level.txt").exists()){
SaveThisAs(level,"Level");
}
if(java.io.File(path+"exp.txt").exists()){
SaveThisAs(exp,"exp");
}
if(java.io.File(path+"maxExp.txt").exists()){
SaveThisAs(maxExp,"maxExp");
}
if(java.io.File(path+"availablePoints.txt").exists()){
SaveThisAs(availablePoints,"availablePoints");
}
if(java.io.File(path+"battleHealing.txt").exists()){
SaveThisAs(regenerationSkill,"battleHealing");
}
if(java.io.File(path+"regenTicks.txt").exists()){
SaveThisAs(regenTicks,"regenTicks");
}
if(java.io.File(path+"strengthSkill.txt").exists()){
SaveThisAs(strengthSkill,"StrengthSkill");
}
if(java.io.File(path+"strengthChance.txt").exists()){
SaveThisAs(strengthChance,"StrengthChance");
}
if(java.io.File(path+"desperateSkill.txt").exists()){
SaveThisAs(desperateSkill,"desperateSkill");
}
if(java.io.File(path+"healSkill.txt").exists()){
SaveThisAs(healSkill,"healSkill");
}
if(java.io.File(path+"healCooldown.txt").exists()){
SaveThisAs(healCooldown,"healCooldown");
}
if(java.io.File(path+"bashSkill.txt").exists()){
SaveThisAs(bashSkill,"bashSkill");
}
if(java.io.File(path+"bashDamage.txt").exists()){
SaveThisAs(bashDamage,"bashDamage");
}
if(java.io.File(path+"innerPeaceSkill.txt").exists()){
SaveThisAs(innerPeaceSkill,"innerPeaceSkill");
}
if(java.io.File(path+"innerPeaceHearts.txt").exists()){
SaveThisAs(innerPeaceHearts,"innerPeaceHearts");
}
if(java.io.File(path+"iphe.txt").exists()){
SaveThisAs(iphe,"iphe");
}
}

function Load(){
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/SkillsResources/"+Level.getWorldName()+"/";
if(java.io.File(path+"Level.txt").exists()){
level = LoadThisData("Level");
}
if(java.io.File(path+"exp.txt").exists()){
exp = LoadThisData("exp");
}
if(java.io.File(path+"maxExp.txt").exists()){
maxExp = LoadThisData("maxExp");
}
if(java.io.File(path+"availablePoints.txt").exists()){
availablePoints = LoadThisData("availablePoints");
}
if(java.io.File(path+"battleHealing.txt").exists()){
regenerationSkill = LoadThisData("battleHealing");
}
if(java.io.File(path+"regenTicks.txt").exists()){
regenTicks = LoadThisData("regenTicks");
}
if(java.io.File(path+"strengthSkill.txt").exists()){
strengthSkill = LoadThisData("strengthSkill");
}
if(java.io.File(path+"strengthChance.txt").exists()){
strengthChance = LoadThisData("strengthChance");
}
if(java.io.File(path+"desperateSkill.txt").exists()){
desperateSkill = LoadThisData("desperateSkill");
}
if(java.io.File(path+"healSkill.txt").exists()){
healSkill = LoadThisData("healSkill");
}
if(java.io.File(path+"healCooldown.txt").exists()){
healCooldown = LoadThisData("healCooldown");
}
if(java.io.File(path+"bashSkill.txt").exists()){
bashSkill = LoadThisData("bashSkill");
}
if(java.io.File(path+"bashDamage.txt").exists()){
bashDamage = LoadThisData("bashDamage");
}
if(java.io.File(path+"innerPeaceSkill.txt").exists()){
innerPeaceSkill = LoadThisData("innerPeaceSkill");
}
if(java.io.File(path+"innerPeaceHearts.txt").exists()){
innerPeaceHearts = LoadThisData("innerPeaceHearts");
}
if(java.io.File(path+"iphe.txt").exists()){
iphe = LoadThisData("iphe");
}
}

function showHitMessage() {
 ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {

    var menu = new android.widget.LinearLayout(ctx);
    var scrollview = new android.widget.ScrollView(ctx);
    var menuLayout = new android.widget.LinearLayout(ctx);

    var creator = new android.widget.TextView(ctx);

    menu.setOrientation(1);
    menuLayout.setOrientation(1);

    scrollview.addView(menu);
    menuLayout.addView(scrollview);

    var button1 = new android.widget.Button(ctx);
    button1.setText("Hit an mob to use this Skill");
    button1.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       print("Attack an Mob to use this skill");

     }
    }));
    menu.addView(button1);

var button = new android.widget.Button(ctx);
    button.setText("Cancel");
    button.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       selectingTarget = false;
       selectingTargetCo = "NaN";
       removeHitMessage();

     }
    }));
    menu.addView(button);

    menuui4 = new android.widget.PopupWindow(menuLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight()/6);

    menuui4.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE));

    menuui4.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.TOP, 0, 0);


   } catch (error) {
    print("Error: " + error);
   }
  }
 }));
}

function menu() {
 ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {

    var menu = new android.widget.LinearLayout(ctx);
    var scrollview = new android.widget.ScrollView(ctx);
    var menuLayout = new android.widget.LinearLayout(ctx);

    var creator = new android.widget.TextView(ctx);

    menu.setOrientation(1);

    menuLayout.setOrientation(1);

    scrollview.addView(menu);
    menuLayout.addView(scrollview);



   menu.addView(levelText);
   menu.addView(expText);
    var button1 = new android.widget.Button(ctx);
    button1.setText("Skills");
    button1.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       menu2();
       menuTB();

     }
    }));
    menu.addView(button1);

    menuui = new android.widget.PopupWindow(menuLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()/6, ctx.getWindowManager().getDefaultDisplay().getHeight()/5);

    menuui.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE));

    menuui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, 0, 0);


   } catch (error) {
    print("Error: " + error);
   }
  }
 }));
}

function menu2() {
 ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {

    var menu = new android.widget.LinearLayout(ctx);
    var scrollview = new android.widget.ScrollView(ctx);
    var menuLayout = new android.widget.LinearLayout(ctx);
    var creator = new android.widget.TextView(ctx);
    var creator2 = new android.widget.TextView(ctx);
    var creator3 = new android.widget.TextView(ctx);
    var creator4 = new android.widget.TextView(ctx);
    var creator5 = new android.widget.TextView(ctx);
    var creator6 = new android.widget.TextView(ctx);
   creator.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator2.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator3.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator4.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator5.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
   creator6.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD")); 

    menu.setOrientation(1);
    menuLayout.setOrientation(1);

    scrollview.addView(menu);
    menuLayout.addView(scrollview);

var st = new android.widget.TextView(ctx);

   menu.addView(st);
     st.setTextColor(android.graphics.Color.parseColor("#FFDDDDDD"));
    st.setTextSize(25);
    st.setText("Available Skill Points : "+availablePoints+"\n");
    menu.addView(creator);
    creator.setTextSize(20);
    creator.setText("Battle Healing               Current Skill Level: "+regenerationSkill);
//15 spaces
    var button1 = new android.widget.Button(ctx);
    button1.setText("Add Skill Point");
    button1.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(availablePoints >= 1 && regenerationSkill !== regenMax){
       regennotice();

      }
      if(availablePoints <= 0){
     menuui2.dismiss();
     GUI2.dismiss();
     print("You dont have any Skill Points!");
       }
      if(availablePoints >= 1 && regenerationSkill == regenMax){
      menuui2.dismiss();
     GUI2.dismiss();
     print("This skill is already at Maximum level");
        }
     }
    }));
    menu.addView(button1);

menu.addView(creator2);
    creator2.setTextSize(20);
    creator2.setText("Rage               Current Skill Level: "+strengthSkill);
//15 spaces
    var button2 = new android.widget.Button(ctx);
    button2.setText("Add Skill Point");
    button2.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(availablePoints >= 1 && strengthSkill !== strengthMax){
       strengthnotice();

      }
      if(availablePoints <= 0){
     menuui2.dismiss();
     GUI2.dismiss();
     print("You dont have any Skill Points!");
       }
      if(availablePoints >= 1 && strengthSkill == strengthMax){
      menuui2.dismiss();
     GUI2.dismiss();
     print("This skill is already at Maximum level");
        }
     }
    }));
    menu.addView(button2);

    if(regenerationSkill >= 10 && healSkill >= 5){
    menu.addView(creator3);
    creator3.setTextSize(20);
    creator3.setText("Desperate               Current Skill Level: "+desperateSkill);//15 spaces
    var button3 = new android.widget.Button(ctx);
    button3.setText("Add Skill Point");
    button3.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(availablePoints >= 1 && desperateSkill !== desperateMax){
       desperatenotice();

      }
      if(availablePoints <= 0){
     menuui2.dismiss();
     GUI2.dismiss();
     print("You dont have any Skill Points!");
       }
      if(availablePoints >= 1 && desperateSkill == desperateMax){
      menuui2.dismiss();
     GUI2.dismiss();
     print("This skill is already at Maximum level");
        }
     }
    }));
    menu.addView(button3);
   }

    menu.addView(creator4);
    creator4.setTextSize(20);
    creator4.setText("Heal               Current Skill Level: "+healSkill);
//15 spaces
    var button4 = new android.widget.Button(ctx);
    button4.setText("Add Skill Point");
    button4.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(availablePoints >= 1 && healSkill !== healMax){
       healnotice();

      }
      if(availablePoints <= 0){
     menuui2.dismiss();
     GUI2.dismiss();
     print("You dont have any Skill Points!");
       }
      if(availablePoints >= 1 && healSkill == healMax){
      menuui2.dismiss();
     GUI2.dismiss();
     print("This skill is already at Maximum level");
        }
     }
    }));
    menu.addView(button4);

   if(healSkill >= 1){
var button5 = new android.widget.Button(ctx);
    button5.setText("Assign Hotkey");
    button5.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
     menu3("HealSkill");

    hotkeyGUI.dismiss();
     menuui2.dismiss();
     GUI2.dismiss();
       }
    }));
    menu.addView(button5);
  }

    menu.addView(creator5);
    creator5.setTextSize(20);
    creator5.setText("Bash               Current Skill Level: "+bashSkill);//15 spaces
    var button6 = new android.widget.Button(ctx);
    button6.setText("Add Skill Point");
    button6.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(availablePoints >= 1 && bashSkill !== bashMax){
       bashnotice();

      }
      if(availablePoints <= 0){
     menuui2.dismiss();
     GUI2.dismiss();
     print("You dont have any Skill Points!");
       }
      if(availablePoints >= 1 && bashSkill == bashMax){
      menuui2.dismiss();
     GUI2.dismiss();
     print("This skill is already at Maximum level");
        }
     }
    }));
    menu.addView(button6);

   if(bashSkill >= 1){
var button7 = new android.widget.Button(ctx);
    button7.setText("Assign Hotkey");
    button7.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
     menu3("BashSkill");
    hotkeyGUI.dismiss();
     menuui2.dismiss();
     GUI2.dismiss();
       }
    }));
    menu.addView(button7);
  }

    if(regenerationSkill >= 10 && healSkill >= 10){
    menu.addView(creator6);
    creator6.setTextSize(20);
    creator6.setText("Inner Peace               Current Skill Level: "+innerPeaceSkill);
//15 spaces
    var button8 = new android.widget.Button(ctx);
    button8.setText("Add Skill Point");
    button8.setOnClickListener(new android.view.View.OnClickListener({
     onClick: function(viewarg) {
       if(availablePoints >= 1 && innerPeaceSkill !== innerPeaceMax){
       peacenotice();

      }
      if(availablePoints <= 0){
     menuui2.dismiss();
     GUI2.dismiss();
     print("You dont have any Skill Points!");
       }
      if(availablePoints >= 1 && innerPeaceSkill == innerPeaceMax){
      menuui2.dismiss();
     GUI2.dismiss();
     print("This skill is already at Maximum level");
        }
     }
    }));
    menu.addView(button8);
   }

    menuui2 = new android.widget.PopupWindow(menuLayout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight());

    menuui2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.WHITE));

    menuui2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, 0, 0);

   } catch (error) {
    print("Error: " + error);
   }
  }
 }));
}


var phase1 = false;
var GUI;

function bM() {
	ctx.runOnUiThread(new java.lang.Runnable() {
		run: function() {

			try {
				GUI = new android.widget.PopupWindow();
				var layout = new android.widget.LinearLayout(ctx);
				var x = new android.widget.Button(ctx);

				GUI.setContentView(layout);
				GUI.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				GUI.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);

				//x.setBackgroundDrawable(menubuttonimageEncoded);
				x.setText("-");

				layout.setOrientation(android.widget.LinearLayout.VERTICAL);
				layout.setGravity(android.view.Gravity.LEFT);
				layout.addView(x);

                     x.setOnLongClickListener(new android.view.View.OnLongClickListener(){
                     onLongClick: function() {
                     Config();
                      return true;
                      }
                 });

				x.setOnClickListener(new android.view.View.OnClickListener() {
					onClick: function(view) {
                    if(phase1 == false){
                    removeMenu();
                    phase1 = true;
                    x.setText("+");
              }
       else if(phase1 == true){
     menu();
    phase1 = false;
    x.setText("-");
   }
					}

				});

			} catch (e) {
				clientMessage("Error: " + e);
			}

		}
	});
}


var GUI2;
function menuTB() {
	ctx.runOnUiThread(new java.lang.Runnable() {
		run: function() {

			try {
				GUI2 = new android.widget.PopupWindow();
				var layout = new android.widget.LinearLayout(ctx);
				var x = new android.widget.Button(ctx);

				GUI2.setContentView(layout);
				GUI2.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				GUI2.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				GUI2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);

				//x.setBackgroundDrawable(menubuttonimageEncoded);
				x.setText("x");

				layout.setOrientation(android.widget.LinearLayout.VERTICAL);
				layout.setGravity(android.view.Gravity.RIGHT);
				layout.addView(x);

				x.setOnClickListener(new android.view.View.OnClickListener() {
					onClick: function(view) {
                    removeMenu2();
                    GUI2.dismiss();
					}

				});

			} catch (e) {
				clientMessage("Error: " + e);
			}

		}
	});
}

function peacenotice(){
if(availablePoints => 0){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

var mathp = innerPeaceHearts+2;
var t = 20;
dialog.setTitle(" Add Skill Point to Inner Peace? ");
qqqqqq.setText("Current Level : +"+innerPeaceHearts+" Max Health\nNext Level : +"+mathp+" Max Health");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
if(availablePoints >= 0){
innerPeaceSkill=innerPeaceSkill+1;
availablePoints=availablePoints-1;
innerPeaceHearts=innerPeaceHearts+2;
iphe=iphe+2;
menuui2.dismiss();
dialog.dismiss()
GUI2.dismiss();
}
if(availablePoints <= 0){
print("You dont have any Skill Points!");
menuui2.dismiss();
dialog.dismiss();
GUI2.dismiss();
}
 
}
})
esp.setText(" Add  ")

esp.setTextSize(20)
menu.addView(esp); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}
}

function regennotice(){
if(availablePoints => 0){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

var mathp = regenTicks-10;
var t = 20;
dialog.setTitle(" Add Skill Point to Battle Healing? ");
qqqqqq.setText("Current Level : Regenerates Half a Heart every "+regenTicks/t+" seconds\nNext Level : Regenerates Half a Heart every "+mathp/t+" seconds");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
if(availablePoints >= 0){
regenerationSkill=regenerationSkill+1;
availablePoints=availablePoints-1;
regenTicks=regenTicks-10;
menuui2.dismiss();
dialog.dismiss()
GUI2.dismiss();
}
if(availablePoints <= 0){
print("You dont have any Skill Points!");
menuui2.dismiss();
dialog.dismiss();
GUI2.dismiss();
}
 
}
})
esp.setText(" Add  ")
esp.setTextSize(20)
menu.addView(esp); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}
}

function strengthnotice(){
if(availablePoints => 0){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

var mathp = strengthChance+10;
var t = 20;
dialog.setTitle(" Add Skill Point to Rage? ");
qqqqqq.setText("Current Level : Has a "+strengthChance+"% to enter rage mode\nNext Level : Has a "+mathp+"% to enter rage mode");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
if(availablePoints >= 0 && strengthSkill !== 0){
strengthSkill=strengthSkill+1;
availablePoints=availablePoints-1;
strengthChance=strengthChance+10;
menuui2.dismiss();
dialog.dismiss()
GUI2.dismiss();
}
if(availablePoints >= 0 && strengthSkill == 0){
strengthSkill=strengthSkill+1;
availablePoints=availablePoints-1;
menuui2.dismiss();
dialog.dismiss()
GUI2.dismiss();
}
if(availablePoints <= 0){
print("You dont have any Skill Points!");
menuui2.dismiss();
dialog.dismiss();
GUI2.dismiss();
}
 
}
})
esp.setText(" Add  ")
esp.setTextSize(20)
menu.addView(esp); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}
}

function healnotice(){
if(availablePoints => 0){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

var mathp = healCooldown-20;
var t = 20;
dialog.setTitle(" Add Skill Point to Heal? ");
qqqqqq.setText("Current Level : Regenerates a Heart when used \nCooldown: "+healCooldown/t+" seconds\nNext Level : Regenerates a Heart when used \nCooldown: "+mathp/t+" seconds");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
if(availablePoints >= 0){
healSkill=healSkill+1;
availablePoints=availablePoints-1;
healCooldown=healCooldown-20;
menuui2.dismiss();
dialog.dismiss()
GUI2.dismiss();
}
if(availablePoints <= 0){
print("You dont have any Skill Points!");
menuui2.dismiss();
dialog.dismiss();
GUI2.dismiss();
}
 
}
})
esp.setText(" Add  ")
esp.setTextSize(20)
menu.addView(esp); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}
}

function bashnotice(){
if(availablePoints => 0){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

var mathp = bashDamage+2;
var t = 20;
dialog.setTitle(" Add Skill Point to Bash? ");
qqqqqq.setText("Current Level : Inflicts "+bashDamage+" Hearts on the target \nCooldown: "+bashCooldown/t+" seconds\nNext Level : Inflicts "+mathp+" Hearts on the target \nCooldown: "+bashCooldown/t+" seconds ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
if(availablePoints >= 0){
bashSkill=bashSkill+1;
availablePoints=availablePoints-1;
bashDamage=bashDamage+2;
menuui2.dismiss();
dialog.dismiss()
GUI2.dismiss();
}
if(availablePoints <= 0){
print("You dont have any Skill Points!");
menuui2.dismiss();
dialog.dismiss();
GUI2.dismiss();
}
 
}
})
esp.setText(" Add  ")
esp.setTextSize(20)
menu.addView(esp); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}
}

function desperatenotice(){
if(availablePoints => 0){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

var t = 20;
dialog.setTitle(" Add Skill Point to Desperate? ");
qqqqqq.setText(" When your remaining heart is only one this skill will activate and give you the advantage of getting away or time to fight back");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
if(availablePoints >= 0){
desperateSkill=desperateSkill+1;
availablePoints=availablePoints-1;
menuui2.dismiss();
dialog.dismiss()
GUI2.dismiss();
}
if(availablePoints <= 0){
print("You dont have any Skill Points!");
menuui2.dismiss();
dialog.dismiss();
GUI2.dismiss();
}
 
}
})
esp.setText(" Add  ")
esp.setTextSize(20)
menu.addView(esp); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}
}

function removeMenu(){
ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {
 
  menuui.dismiss();
  levelText.getParent().removeView(levelText);
  expText.getParent().removeView(expText); 
  Save();

} catch (error) {
    print("Error: " + error);
   }
  }
 }));
}

function removeMenu2(){
ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {
 
  menuui2.dismiss();

} catch (error) {
    print("Error: " + error);
   }
  }
 }));
}

function attackHook(a,v){
if(strengthSkill !== 0 && a == getPlayerEnt()){
var rn = Math.floor(Math.random()*100);
if(strengthChance >= rn){
Entity.addEffect(getPlayerEnt(), MobEffect.damageBoost, 20 * 3, 1, false, true);
Entity.addEffect(getPlayerEnt(), MobEffect.digSpeed, 20 * 2, 0, false, true);
}
}
if(selectingTarget == true && selectingTargetCo =="Bash"){
bashUsable = false;
selectingTarget = false;
selectingTargetCo = "NaN";
Entity.setHealth(v,Entity.getHealth(v)-bashDamage);
removeHitMessage();
}
}

function newLevel(){
bM();
menu();
hotKey();
inWorld = true;
autoSaveCount = 0;
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/SkillsResources/"+Level.getWorldName()+"/";
if(!java.io.File(path+"Saved?.txt").exists()){
level = 1;
exp = 0;
maxExp = 1000;
availablePoints = 0;
regenerationSkill = 0;
regencount = 0;
regenTicks = 420;
strengthSkill = 0;
strengthChance = 10;
desperateSkill = 0;
healSkill = 0;
healUsable = true;
bashMax = 10;
bashSkill = 0;
bashDamage = 10;
bashCount = 0;
bashCooldown = 600;
bashUsable = true;
selectingTarget = false;
selectingTargetCo = "NaN";
innerPeaceSkill = 0;
innerPeaceHearts = 0;
iphe = 20;
Save();
}
if(java.io.File(path+"Saved?.txt").exists())
Load();
}


function removeHitMessage(){
ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {
 
  menuui4.dismiss();

} catch (error) {
    print("Error: " + error);
   }
  }
 }));
}

function leaveGame(){
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/SkillsResources/"+Level.getWorldName()+"/";

if(!java.io.File(path+"Saved?.txt").exists())
Save();

ctx.runOnUiThread(new java.lang.Runnable({


  run: function() {

   try {
   inWorld = false;
  menuui.dismiss();
       levelText.getParent().removeView(levelText);
       expText.getParent().removeView(expText);
   GUI.dismiss();
   Save();
   menuui3.dismiss();
   menuui4.dismiss();
   hotkeyGUI.dismiss();

   } catch (error) {
    
   }
  }
 }));
}

function deathHook(murderer,victim){
exp=exp+Math.floor(Math.random()*150);
}

function modTick(){
if(maxExp <= exp){
level=level+1;
availablePoints=availablePoints+1;
exp = 0;
maxExp=maxExp+1000+Math.floor(Math.random()*500);
}
if(regenerationSkill !== 0){
regencount++;
}
if(healUsable == false){
healCount++;
}
if(healCount >= healCooldown){
healCount = 0;
healUsable = true;
}
if(bashUsable == false){
bashCount++;
}
if(bashCount >= bashCooldown){
bashUsable = true;
bashCount = 0;
}
if(innerPeaceSkill >= 1 && iphe !== 20){
Entity.setMaxHealth(getPlayerEnt(),iphe);
}
if(inWorld == true){
autoSaveCount++;
}
if(autoSaveCount >= autoSaveMax){
autoSaveCount = 0;
Save();
}
if(regencount >= regenTicks && regencount <= regenTicks+20 && Entity.getHealth(getPlayerEnt()) !== Entity.getMaxHealth(getPlayerEnt())){
regencount = 0;
Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+1);
Level.addParticle(ParticleType.hearts,Player.getX(),Player.getY(),Player.getZ(),0,0,0,0);
} 
if(regencount >= regenTicks && regencount <= regenTicks+20 && Entity.getHealth(getPlayerEnt()) == Entity.getMaxHealth(getPlayerEnt())){
regencount = 0;
}
var ph = Entity.getHealth(getPlayerEnt());
if(desperateSkill == 1 && ph >= 1 && ph <= 3){
Entity.addEffect(getPlayerEnt(), MobEffect.digSpeed, 20 * 5, 0, false, true);
Entity.addEffect(getPlayerEnt(), MobEffect.damageResistance, 20 * 5, 2, false, true);
Entity.addEffect(getPlayerEnt(), MobEffect.movementSpeed, 20 * 10, 3, false, true);
//Entity.addEffect(getPlayerEnt(), MobEffect.absorption, 20 * 2, 0, false, true);
}
ctx.runOnUiThread(new java.lang.Runnable({

  run: function() {

   try {
  levelText.setText("Level : "+level);
  expText.setText("Exp : "+exp+"/"+maxExp);

} catch (error) {
    print("Error: " + error);
   }
  }
 }));
}

//Damage Increase
//Hp regen**
//Dash
//Desperate