package com.ethereumchat;

import android.util.Log;

import androidx.annotation.NonNull;
import android.content.Intent;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import statusgo.Statusgo;
import statusgo.SignalHandler;

public class EthereumChatAccountModule extends ReactContextBaseJavaModule implements LifecycleEventListener, SignalHandler {

    private static final String TAG = "EthereumChatAccountModu";

    public EthereumChatAccountModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "EthereumChatAccountModule";
    }

    @Override
    public void onHostResume() {  // Activity `onResume`
      Log.d(TAG, "Setting signal handler");
      Statusgo.setMobileSignalHandler(this);
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
    }


    @ReactMethod
    public void createAccount(Callback errorCallback,Callback successCallback){
        try{
            String accountData = Statusgo.startOnboarding(1,12);
            Log.d(TAG, "createAccount: " + accountData);
            successCallback.invoke(accountData);
        }
        catch (IllegalViewOperationException e){
           errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void saveAccountAndLogin(String accountData,String password,String nodeConfig,String multiAccounts){
        Log.d(TAG, "saveAccountAndLogin: called with " + accountData );
        String result = Statusgo.saveAccountAndLogin(accountData, password, "{}", nodeConfig, multiAccounts);
        if (result.startsWith("{\"error\":\"\"")) {
            Log.d(TAG, "saveAccountAndLogin result12: " + result);
            try {
            Thread.sleep(4000);
            } catch (InterruptedException e){
            }
            String adminInfo = Statusgo.callPrivateRPC("admin_peers");
            Log.d(TAG, "Geth node started" + adminInfo);
        } else {
            Log.e(TAG, "saveAccountAndLogin failed: " + result);
        }
    }


    public void handleSignal(final String jsonEventString) {
        try {
            final JSONObject jsonEvent = new JSONObject(jsonEventString);
            String eventType = jsonEvent.getString("type");
            Log.d(TAG, "Signal event: " + jsonEventString);

            // NOTE: the newMessageSignalHandler is only instanciated if the user
            // enabled notifications in the app
            WritableMap params = Arguments.createMap();
            params.putString("jsonEvent", jsonEventString);
            this.getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("gethEvent", params);
        } catch (JSONException e) {
            Log.e(TAG, "JSON conversion failed: " + e.getMessage());
        }
    }

}
