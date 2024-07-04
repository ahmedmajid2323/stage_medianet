<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CV;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\ElseIf_;

class CVmaker extends Controller

{
    public function create_cv(){
        $resume = CV::create() ;
        $user = Auth::user();
        $resume->user = $user->id ;
        $resume->save() ;
        return response()->json([
            'id'=>$resume->id
        ]);
    }

    public function personnelle(Request $request , $cv_id){

        $inf_personnelles = $request->validate([
            'fullname'=>'required',
            'email'=>'required',
            'address'=>'required',
            'phone'=>'required',
            'summary'=>'required',
            'profession'=>'required'
        ]);
        $personnelleObject =[
            'fullname' => $inf_personnelles['fullname'],
            'email' => $inf_personnelles['email'],
            'phone' => $inf_personnelles['phone'],
            'address' => $inf_personnelles['address'],
            'summary' => $inf_personnelles['summary'],
            'profession' => $inf_personnelles['profession'],
        ];

        $current_cv = CV::where('id',$cv_id)->first() ;
        $current_cv->personnelle = json_encode($personnelleObject) ;
        $current_cv->save() ;
        return response()->json([
            'personnelle'=>$current_cv->personnelle,
        ]);
    }

    public function get_personnelle($cv_id){
        $personel_data = CV::where('id',$cv_id)->first()->personnelle ;
        return response()->json([
            'personnelle'=>$personel_data
        ]);
    }

    public function experience(Request $request , $cv_id){
        $experience_data=$request->validate([
            'company'=>'required',
            'date'=>'required',
            'diplome'=>'required',
            'lieu'=>'required',
        ]);
       
        $user_cv = CV::where('id' , $cv_id)->first() ;

        $experience_array = [
            'company'=>$experience_data['company'],
            'date'=>$experience_data['date'],
            'diplome'=>$experience_data['diplome'],
            'lieu'=>$experience_data['lieu'],
        ];
        $current_data = $user_cv->experience ;
        if (empty($current_data)) {
            $current_data = [];
            $current_data[] = $experience_array;
            $user_cv->experience = json_encode($current_data);
            $user_cv->save();
        }else{
            $current_data = json_decode($current_data, true);
            // Ensure it's an array (in case of corruption or unexpected structure), ==> a voir !!!!!!
            if (!is_array($current_data)) {
                $current_data = [];
            }
            $current_data[] = $experience_data;
            $user_cv->experience = json_encode($current_data);
            $user_cv->save();
        };
        return response()->json([
            'experience'=>$user_cv->experience  
        ]);
    }

    public function get_experience($cv_id){
        $user_experience = CV::where('id',$cv_id)->first()->experience ;
        return response()->json([
            'experience'=>$user_experience
        ]);
    }

    public function project(Request $request , $cv_id){
        $data_sent = $request->validate([
            'description'=>'required',
            'project'=>'required',
        ]);
        $project_data = [
            'description'=>$data_sent['description'],
            'project'=>$data_sent['project'],
        ];

        $user_cv = CV::where('id' , $cv_id)->first() ;
        $current_projects = $user_cv->projet ;
        if (empty($current_projects)) {
            $current_projects = [];
            $current_projects[] = $project_data;
            $user_cv->projet = json_encode($current_projects);
            $user_cv->save();
        }else{
            $current_projects = json_decode($current_projects, true);
            // Ensure it's an array (in case of corruption or unexpected structure), ==> a voir !!!!!!
            if (!is_array($current_projects)) {
                $current_projects = [];
            }
            $current_projects[] = $project_data;
            $user_cv->projet = json_encode($current_projects);
            $user_cv->save();
        };
        return response()->json([
            'project'=>$user_cv->projet
        ]);

    }

    public function get_project($cv_id){
        $user_project = CV::where('id',$cv_id)->first()->projet ;
        return response()->json([
            'project'=>$user_project
        ]);
    }

    public function certificat(Request $request , $cv_id){
        $sent_request = $request->validate([
            'organization'=>'required',
            'date'=>'required',
            'title'=>'required',
        ]);

        $user_cv = CV::where('id' , $cv_id)->first() ;
        $current_certificates = $user_cv->certificat ;
        if (empty($current_certificates)) {
            $current_certificates = [];
            $current_certificates[] = $sent_request;
            $user_cv->certificat = json_encode($current_certificates);
            $user_cv->save();
        }else{
            $current_certificates = json_decode($current_certificates, true);
            // Ensure it's an array (in case of corruption or unexpected structure), ==> a voir !!!!!!
            if (!is_array($current_certificates)) {
                $current_certificates = [];
            }
            $current_certificates[] = $sent_request;
            $user_cv->certificat = json_encode($current_certificates);
            $user_cv->save();
        };
        return response()->json([
            'certificates'=>$user_cv->certificat
        ]);
    }

    public function get_certificat($cv_id){
        $user_certificat = CV::where('id',$cv_id)->first()->certificat ;
        return response()->json([
            'certificat'=>$user_certificat
        ]);
    }

    public function competence(Request $request , $cv_id){
        $sent_data = $request->validate([
            'option'=>'required',
            'level'=>'',
            'title'=>'required',
        ]);
        $data = [
            'title'=>$sent_data['title'],
            'level'=>$sent_data['level'],
        ];
        $user_cv = CV::where('id',$cv_id)->first() ;
        $current_competence = CV::where('id',$cv_id)->first()->competence ;
        $decoded_current_competence = $current_competence ? json_decode($current_competence , true) : [] ;

        if($sent_data['option'] === 'technical_skills'){
            $decoded_current_competence['technical_skills'][] = $sent_data['title'] ;
        }
        elseif($sent_data['option'] === 'general_skills'){
            $decoded_current_competence['general_skills'][] = $data ;
        }
        elseif($sent_data['option'] === 'languages'){
            $decoded_current_competence['languages'][] = $data;
        }
        $user_cv->competence = json_encode($decoded_current_competence) ;
        $user_cv->save();
        return response()->json([
            'competence'=>$user_cv->competence
        ]);

    }

    public function get_competence($cv_id){
        $user_competence = CV::where('id',$cv_id)->first()->competence ;
        return response()->json([
            'competence'=>$user_competence
        ]);
    }

    public function get_cv(){
        $user = Auth::user() ; 
        $all_cv = CV::where('user',$user->id)
                ->select('id', 'created_at')
                ->get() ;
        return response()->json([
            'cv'=>$all_cv
        ]);
    }

    public function delete_cv($id){
        $cv = CV::where('id',$id) ;
        $cv->delete() ;
        return response()->json([
            'msg'=>'deleted successfully'
        ]);
    }
    
    
}
