<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Illuminate\Validation\Rule;
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

     // It is Registration Api.
     public function signup(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/'
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

    // It is Login Api.
    public function login(Request $request) {
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
    
    // It is Logout Api.
    public function logout(Request $request)  {
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
    
    //It will given token based data  
    public function user(Request $request){
        return response()->json($request->user());
    }

    //It will given all data.  
   public function index() {
       $users = User::get();
     $user = auth()->user()->user;
     return response()->json($users);
   }
  
   //It will do update the data. 
   public function update(Request $request, $id) {
       $email = $request->only('email');
     $user = auth()->user()->find($id);
     $otherUser =   User::where('email', $email['email'])->first(); 
     
     if(!empty($otherUser) && $otherUser->id != $id){
  
         return response()->json([
            'success' => false,
            'message' => ' Email already exist'
          ], 400);
      }

      if (!$user) {
          return response()->json([
             'success' => false,
              'message' => ' User is not existing on this  ' . $id . '.'
          ], 400);
      }
      $updated = $user->fill($request->all())->save();
      if ($updated) {
          return response()->json([
              'success' => true,
              'message' => ' User is updated successfully. '
          ]);
      } else{
          return response()->json([
              'success' => false,
              'message' => 'User could not be updated'
          ], 500);
      }
  }
   

   //It will do delete the data. 
  public function delete(Request $request, $id){
      $user = auth()->user()->find($id);
      if(!$user){
          return response()->json([
              'success' => false,
              'message' => ' User is not avalibale on id number' . $id . '.'
          ]);
      } else{
          $user->delete();
          return response()->json([
              'success' => true,
              'status' => 204,
              'message' => ' User deleted successfully.'
          ]);
      }
  }

  // It will given data data based on id.
  public function getUser($id) {
      $user = User::find($id);
      if(!$user){
          return response()->json([
              'success' => false,
              'message' => ' User is not exist on id number ' . $id . '.'
          ]);
  
      }else{
          return response()->json([
              'status' => 200,
              'data' => $user
          ]);
  
      }
  }
  
      
}