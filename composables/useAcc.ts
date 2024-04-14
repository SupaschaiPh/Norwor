export default function (){
    return useState<userSession | null>('acc', () => null)
}
