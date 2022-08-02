public with sharing class Controller {
    @AuraEnabled(cacheable=true)
    public static String getAndParse() {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
        req.setMethod('GET');
        HttpResponse res = http.send(req);
        System.debug(res.getBody());
        if(res.getStatusCode() == 200) {
            System.debug(res.getBody());
            }
            return res.getBody();
        }
}
