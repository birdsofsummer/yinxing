package com.chinalaw.vote

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.activity_main.*
import okhttp3.*
import java.io.IOException



//https://www.cnblogs.com/zanzg/p/9129375.html
fun ask_perm(
    activity: Activity,
    code:Int
):Boolean{
    val PERMISSIONS_CAMERA_AND_STORAGE=arrayOf<String>(
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.WRITE_EXTERNAL_STORAGE,
        Manifest.permission.CAMERA
    )
    val ok:Boolean=when(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
        true->{
            val storagePermission = activity.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)
            val cameraPermission = activity.checkSelfPermission(Manifest.permission.CAMERA)
            if (storagePermission != PackageManager.PERMISSION_GRANTED ||
                cameraPermission != PackageManager.PERMISSION_GRANTED) {
                //申请权限
                activity.requestPermissions(PERMISSIONS_CAMERA_AND_STORAGE, code);
                //返回false。说明没有授权
                return false;
            }
            return true
        }
        else->true
    }
    return ok
}

class MainActivity : AppCompatActivity() {
    fun echo(i:Any){
        Toast.makeText(this,"${i}", Toast.LENGTH_LONG).show()
    }
    private fun echo2(){
//        thread(start = true) {
//            editText.setText("wait ...")
//        }
//        doAsync {
//
//                // editText.setText("1111")
//        }
        Thread({
            editText.setText("wait ...")
            try{
                val client: OkHttpClient = OkHttpClient();
                //val u="https://www.baidu.com"
                val u="https://httpbin.org/get"
                val request= Request
                    .Builder()
                    .url(u)
                    .get()
                    .build()
                client.newCall(request).enqueue(object : Callback {
                    override fun onFailure(call: Call, e: IOException) {
                        //echo("fail")
                        editText.setText("fail")
                    }
                    override fun onResponse(call: Call, response: Response) {
                        val code = response.code
                        val s=response.body!!.string()
                        //echo("ok:"+code.toString())
                        //echo(s)
                        editText.setText(s)
                    }})
            }catch (ex: Exception) {
                //ex.printStackTrace()
                editText.setText("eeee ...")
            }
        }).start()


    }


    override fun onCreate(savedInstanceState: Bundle?) {

        ask_perm(this,1)
        //ttt()
        //editText.setText("...".repeat(1000))
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        //val img_u="https://img3.doubanio.com/icon/u42599401-91.jpg"
        //imageView2.setImageURI(Uri.parse(img_u));

        start_button.setOnClickListener {
            val a= client_id.text.toString()
            val b= client_secret.text.toString()
            echo("%s %s".format(a,b))

        }
        fab.setOnClickListener { view ->
            Snackbar.make(view, "ccc", Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show()
           // webView.loadUrl();
            webView.webViewClient = WebViewClient()
            webView.loadDataWithBaseURL("http://www.baidu.com", "zzz", "text/html", "utf-8",null);
            echo2()

        }
       // echo("123")
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        return when(item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }
}
