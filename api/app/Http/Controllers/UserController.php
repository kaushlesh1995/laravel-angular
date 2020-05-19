<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
class UserController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        return response()->json([
            'messages' => 'Successfully created user!'
        ], 201);
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',

            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Email or Password does\'t exist.'
            ], 401);
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }


    public function index()
    {
        $users = User::get();
      $user = auth()->user()->user;
       
 
        return response()->json($users);
      
    }


    // public function update(Request $request, $id)
    // {
    //     $user = auth()->user()->products()->find($id);
 
    //     if (!$user) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Product with id ' . $id . ' not found'
    //         ], 400);
    //     }
 
    //     $updated = $user->fill($request->all())->save();
 
    //     if ($updated)
    //         return response()->json([
    //             'success' => true
    //         ]);
    //     else
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Product could not be updated'
    //         ], 500);
    // }
 
 
        
    public function getUser(Request $request){
        // echo"hum nhi sudherenge";
        $user = User::get();
        print_r($user);
        return $request->user();
    }

       
            // 'success' => true,
                       // 'data' => $user

                       public function shivam(){
                           echo"testone";
                       }

}

